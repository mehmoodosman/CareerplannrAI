// File: app/components/CareerRecommender.js
import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, CircularProgress } from '@mui/material';
import { useOpenAI } from '../hooks/useOpenAI';
import RecommendationCard from './RecommendationCard';

const CareerRecommender = ({ userProfile }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const openai = useOpenAI();

  useEffect(() => {
    if (userProfile) {
      generateRecommendations(userProfile);
    }
  }, [userProfile]);

  const generateRecommendations = async (profile) => {
    setLoading(true);
    setError(null);

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `Generate 5 career recommendations for a user with the following profile: ${JSON.stringify(profile)}. Format the response as a JSON array of objects, each with 'title' and 'description' fields.`,
        max_tokens: 1000,
        temperature: 0.7,
      });

      const parsedRecommendations = JSON.parse(response.data.choices[0].text);
      setRecommendations(parsedRecommendations);
    } catch (err) {
      setError('Failed to generate recommendations. Please try again.');
      console.error('Error generating recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = (recommendation, direction) => {
    //logic to save the user's preference
    console.log(`Swiped ${direction} on ${recommendation.title}`);
    //  call an API to save this preference to the backend
  };

  return (
    <Container maxWidth="lg" sx={{ marginY: 8 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" marginBottom={4}>
        Your Career Recommendations
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        ) : (
          recommendations.map((rec, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <RecommendationCard recommendation={rec} onSwipe={handleSwipe} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default CareerRecommender;
