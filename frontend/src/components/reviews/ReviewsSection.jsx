import { Container, Typography, Grid } from '@mui/material';
import { ReviewCard } from './ReviewCard';

import { 
  RateReview, 
 
} from '@mui/icons-material';

const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    comment: 'Amazing results with the homeopathic treatment. Highly recommended!',
    
  },
  {
    id: 2,
    name: 'Michael Chen',
    rating: 4,
    comment: 'Very effective medicines with no side effects.',
   
  },
  {
    id: 3,
    name: 'Emma Wilson',
    rating: 5,
    comment: 'Great service and quick delivery. Will order again!',
  
  },
];


export function ReviewsSection() {
  return (
    <Container sx={{ py: 6,  }}>
      <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2 ,
            mb:2,
          }}
        >
          <RateReview color="primary" fontSize="large" />
          Customer Reviews
        </Typography>
      <Grid container spacing={4}>
        {reviews.map((review) => (
          <Grid item xs={12} sm={6} md={4} key={review.id}>
            <ReviewCard {...review} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}