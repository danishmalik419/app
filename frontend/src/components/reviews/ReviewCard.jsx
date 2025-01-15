import { Card, CardContent, Typography, Rating, Box, Avatar } from '@mui/material';
import { VerifiedUser } from '@mui/icons-material';

export function ReviewCard({ name, rating, comment }) {
  return (
    <Card
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '4px solid',
        borderLeftColor: '#A86E58' // Replace with your theme's primary.main color
      }}
    >
      <CardContent style={{ flexGrow: 1 }}>
        <Box style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <Avatar style={{ marginRight: '16px', backgroundColor: '#A86E58' }}> {/* Replace with primary.light */}
            {name.charAt(0)}
          </Avatar>
          <Box>
            <Typography
              variant="subtitle1"
              style={{
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {name}
              <VerifiedUser style={{ color: '#537B2F', fontSize: 'small', marginLeft: '8px' }} />
            </Typography>
            <Rating value={rating} readOnly size="small" />
          </Box>
        </Box>
        <Typography variant="body2" style={{ fontStyle: 'italic', color: '#6c757d' }}>
          "{comment}"
        </Typography>
      </CardContent>
    </Card>
  );
}
