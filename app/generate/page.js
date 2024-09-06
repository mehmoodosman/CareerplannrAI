'use client'
import { writeBatch, doc, collection, getDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useUser } from "@clerk/nextjs"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Container, Box, Typography, Paper, TextField, Button, Card, CardActionArea, CardContent, Grid, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from "@mui/material"
import Link from 'next/link'
import Image from 'next/image'

export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([]) 
    const [flipped, setFlipped] = useState([]) 
    const [text, setText] = useState('') 
    const [name, setName] = useState('') 
    const [open, setOpen] = useState(false) 
    const [loading, setLoading] = useState(false) 
    const router = useRouter()

    const handleSubmit = async () => {
        setLoading(true)
        fetch('/api/generate', {
            method: 'POST',
            body: JSON.stringify({ text }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.text();  // Use .text() instead of .json() to safely handle any empty response
        })
        .then((text) => {
            if (text) {
                return JSON.parse(text);  // Parse the text if it's not empty
            }
            return {};  // Handle the case where the response body is empty
        })
        .then((data) => setFlashcards(data))
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        })
        .finally(() => setLoading(false)) // Ensure loading state is reset
    }

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const saveFlashcards = async () => {
        if (!name) {
            alert('Please enter a name')
            return 
        }
        const batch = writeBatch(db)
        const userDocRef = doc(collection(db, 'users'), user.id)
        const docSnap = await getDoc(userDocRef)

        if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || []
            if (collections.find((f) => f.name === name)) {
                alert('Flashcard collection with the same name already exists')
                return
            } else {
                collections.push({ name })
                batch.set(userDocRef, { flashcards: collections }, { merge: true })
            }
        } else {
            batch.set(userDocRef, { flashcards: [{ name }] })
        }

        const colRef = collection(userDocRef, name)
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef)
            batch.set(cardDocRef, flashcard)
        })

        await batch.commit()
        handleClose()
        router.push('/flashcards')
    }

    return (
        <Box sx={{ flexGrow: 1, bgcolor: '#121212', minHeight: '100vh', color: '#ffffff' }}>
  
            {/* Navbar */}
            <AppBar position="static" sx={{ backgroundColor: '#1e1e1e', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.4)', borderBottom: '4px solid #e91e63' }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        {/* Logo wrapped in Link */}
                        <Link href="/" passHref>
                            <Image 
                                src="/CareerSwipe.svg"  
                                alt="CareerSwipe Logo"
                                width={100}  
                                height={100}
                                style={{ objectFit: 'contain', cursor: 'pointer' }}
                            />
                        </Link>
                    </Box>

                    <Typography variant="h4" gutterBottom sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        textShadow: '0 0 10px #e91e63',
                        textAlign: 'center',
                        flexGrow: 2,
                    }}>
                        Generate Careercards
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container>
                <Box sx={{ mb: 6 }}>
                    <Paper sx={{ p: 4, bgcolor: '#2c2c2c', borderRadius: '8px' }}>
                        <TextField 
                            value={text} 
                            onChange={(e) => setText(e.target.value)} 
                            label="Enter text" 
                            fullWidth
                            rows={4}
                            variant="outlined"
                            sx={{ mb: 2, bgcolor: '#333', borderRadius: '4px', '& .MuiInputBase-input': { color: '#ffffff' }, '& .MuiFormLabel-root': { color: '#ffffff' }}}
                        />
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            onClick={handleSubmit} 
                            fullWidth
                            sx={{
                                bgcolor: '#e91e63', 
                                color: '#ffffff', 
                                borderRadius: '4px', 
                                ':hover': { bgcolor: '#d81b60' },
                                ':disabled': { bgcolor: '#b0bec5', color: '#ffffff' }
                            }} 
                            disabled={loading}
                        >
                            {loading ? 'Generating...' : 'Generate'}
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
                                    <Card
                                        sx={{
                                            bgcolor: '#2c2c2c',
                                            borderRadius: '15px',
                                            color: '#ffffff',
                                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
                                            transition: 'transform 0.3s, box-shadow 0.3s',
                                            ':hover': { transform: 'scale(1.05)', boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6)' },
                                        }}
                                    >
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
                                                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
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
                        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                onClick={handleOpen}
                                sx={{
                                    bgcolor: '#e91e63', 
                                    color: '#ffffff', 
                                    borderRadius: '4px', 
                                    ':hover': { bgcolor: '#d81b60' }
                                }}
                            >
                                Save
                            </Button>
                        </Box>
                    </Box>    
                )}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle sx={{ color: '#ffffff' }}>Save Flashcards</DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{ color: '#ffffff' }}>
                            Enter the name of your flashcards collection.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Collection Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ bgcolor: '#333', borderRadius: '4px', '& .MuiInputBase-input': { color: '#ffffff' }, '& .MuiFormLabel-root': { color: '#ffffff' }}}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} sx={{ color: '#e91e63' }}>Cancel</Button>
                        <Button onClick={saveFlashcards} sx={{ bgcolor: '#e91e63', color: '#ffffff', ':hover': { bgcolor: '#d81b60' } }}>Save</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    )
}

