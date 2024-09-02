// File: app/components/RecommendationCard.js
import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const RecommendationCard = ({ recommendation, onSwipe }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {recommendation.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {recommendation.description}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <Button 
          startIcon={<ThumbDownIcon />} 
          onClick={() => onSwipe(recommendation, 'left')}
          variant="outlined"
          color="secondary"
        >
          Dislike
        </Button>
        <Button 
          endIcon={<ThumbUpIcon />} 
          onClick={() => onSwipe(recommendation, 'right')}
          variant="contained"
          color="primary"
        >
          Like
        </Button>
      </Box>
    </Card>
  );
};

export default RecommendationCard;
