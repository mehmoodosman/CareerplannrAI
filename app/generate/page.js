'use client'
import { writeBatch, doc, collection, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Box, Typography, Paper, TextField, Button, Card, CardActionArea, CardContent, Grid, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from "@mui/material";
import Footer from "@/components/Footer";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home'; // Import HomeIcon
import Image from 'next/image'; // Import Image for the logo

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false); 
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);
    const router = useRouter();

    const handleUpload = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const selectedFile = event.target.files[0];
        console.log(`Uploading ${selectedFile}`);
        if (selectedFile) {
            setFile(selectedFile);
        }

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await fetch(`/api/loader`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error fetching file`);
            }

            const data = await response.json();
            console.log("loader response: ", data);

            const loadedContent = data.map((page) => page.pageContent).join('\n');
            setText(loadedContent);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        setGenerating(true); // Set generating state to true

        fetch('/api/generate', {
            method: 'POST',
            body: JSON.stringify({ text }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.text();  // Use .text() to handle any empty response
        })
        .then((text) => {
            if (text) {
                return JSON.parse(text);  // Parse the text if it's not empty
            }
            return {};  // Handle the case where the response body is empty
        })
        .then((data) => {
            setFlashcards(data);
            setGenerating(false); // Set generating state to false when done
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
            setGenerating(false); // Ensure generating state is reset even if there's an error
        });
    }

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const saveFlashcards = async () => {
        if (!name) {
            alert('Please enter a name');
            return;
        }
        const batch = writeBatch(db);
        const userDocRef = doc(collection(db, 'users'), user.id);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || [];
            if (collections.find((f) => f.name === name)) {
                alert('Flashcard collection with the same name already exists');
                return;
            } else {
                collections.push({ name });
                batch.set(userDocRef, { flashcards: collections }, { merge: true });
            }
        } else {
            batch.set(userDocRef, { flashcards: [{ name }] });
        }

        const colRef = collection(userDocRef, name);
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef);
            batch.set(cardDocRef, flashcard);
        });

        await batch.commit();
        handleClose();
        router.push('/flashcards');
    }
    
    return (
        <Box sx={{ flexGrow: 1, bgcolor: '#121212', minHeight: '100vh', color: '#ffffff' }}>
            <Container maxWidth="md" sx={{ bgcolor: '#121212', minHeight: '100vh', color: '#ffffff' }}>
                <Box sx={{
                    mt: 4, mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                    {/* Home Icon */}
                    <Button onClick={() => router.push('/')} sx={{ mb: 4 }}>
                        <Image 
                            src="/CareerSwipe.svg"  
                            alt="CareerSwipe Logo"
                            width={100}  
                            height={100}
                            style={{ objectFit: 'contain', cursor: 'pointer' }}
                        />
                    </Button>
                    <Typography variant="h4" gutterBottom sx={{ color: '#ffffff', fontWeight: 'bold', textShadow: '0 0 10px #e91e63' }}>
                        Generate Careercards
                    </Typography>
                    <Paper sx={{ p: 4, width: '100%', bgcolor: '#2c2c2c', borderRadius: '8px' }}>
                        <TextField 
                            value={text} 
                            onChange={(e) => setText(e.target.value)} 
                            label="Paste resume text here"
                            fullWidth
                            multiline
                            rows={8}
                            variant="outlined"
                            sx={{ mb: 2, bgcolor: '#333', '& .MuiInputBase-input': { color: '#ffffff' }, '& .MuiFormLabel-root': { color: '#ffffff' }}}
                        />

                        <Typography align='center' color='#808080' gutterBottom> --- or ---</Typography>
                        <Box mb={6} display='flex' justifyContent='center'>
                            {/* Button with file upload */}
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload resume
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={handleUpload}
                                />
                            </Button>
                        </Box>

                        <Button 
                            variant="contained" 
                            color="secondary" 
                            onClick={handleSubmit} 
                            fullWidth
                            disabled={generating} // Disable the button if generating
                            sx={{
                                bgcolor: '#e91e63',
                                color: '#ffffff',
                                borderRadius: '4px',
                                ':hover': { bgcolor: '#d81b60' },
                                ':disabled': { bgcolor: '#b0bec5', color: '#ffffff' }
                            }}
                        >
                            {generating ? "Generating..." : "Submit"}
                        </Button>
                    </Paper>
                </Box>
                
                {flashcards.length > 0 && (
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#ffffff' }}>
                    Careercards Preview
                </Typography>
                <Grid container spacing={3}>
                    {flashcards.map((flashcard, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{
                                bgcolor: '#2c2c2c',
                                borderRadius: '15px',
                                color: '#ffffff',
                                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                ':hover': { transform: 'scale(1.05)', boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6)' }
                            }}>
                                <CardActionArea onClick={() => handleCardClick(index)}>
                                    <CardContent>
                                        <Box sx={{
                                            perspective: '1000px',
                                            '& > div': {
                                                transition: 'transform 0.6s',
                                                transformStyle: 'preserve-3d',
                                                position: 'relative',
                                                width: '100%',
                                                height: '200px',
                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                                transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                            },
                                            '& > div > div': {
                                                position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                                backfaceVisibility: 'hidden',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                padding: 2,
                                                boxSizing: 'border-box',
                                            },
                                            '& > div > div:nth-of-type(2)': {
                                                transform: 'rotateY(180deg)',
                                            },
                                        }}>
                                            <div>
                                                <div>
                                                    <Typography variant="h6" component="div">{flashcard.front}</Typography>
                                                </div>
                                                <div>
                                                    <Typography variant="subtitle2" component="div">{flashcard.back}</Typography>
                                                </div>
                                            </div>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                        </Grid>

                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleOpen}
                            fullWidth
                            sx={{
                                mt: 4,
                                bgcolor: '#e91e63',
                                color: '#ffffff',
                                borderRadius: '4px',
                                ':hover': { bgcolor: '#d81b60' }
                            }}
                        >
                            Save Flashcards
                        </Button>
                    </Box>
                )}

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Save Flashcards</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter a name for your flashcard set.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Flashcard Set Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ bgcolor: '#333', color: '#ffffff' }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="error">Cancel</Button>
                        <Button onClick={saveFlashcards} color="primary">Save</Button>
                    </DialogActions>
                </Dialog>

                <Footer />
            </Container>
        </Box>
    );
}
