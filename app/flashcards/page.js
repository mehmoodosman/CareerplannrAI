'use client'
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/navigation"
import { CardActionArea, CardContent, Grid, Typography, Container, Card } from "@mui/material"

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return
            const docRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || []
                setFlashcards(collections)
            } else {
                await setDoc(docRef, { flashcards: [] })
            }
        }
        getFlashcards()
    }, [user])

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }

    return (
        <Container maxWidth="100vw">
            <Grid container spacing={3} sx={{ mt: 4 }}>
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
                            <CardActionArea onClick={() => { handleCardClick(flashcard.name) }}>
                                <CardContent>
                                    <Typography 
                                        variant="h6" 
                                        component="div" 
                                        sx={{ 
                                            color: '#e91e63', 
                                            fontWeight: 'bold', 
                                            textShadow: '0 0 10px rgba(233, 30, 99, 0.5)' 
                                        }}
                                    >
                                        {flashcard.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
