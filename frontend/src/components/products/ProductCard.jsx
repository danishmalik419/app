import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  CardActions,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Healing, ShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';

export function ProductCard({ name, image, price, description, additionalInfo }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Card
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px)';
        e.currentTarget.style.boxShadow = '4px 4px 10px rgba(0, 0, 0, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <Box style={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="250"
          image={image}
          alt={name}
          style={{
            objectFit: 'cover',
            filter: 'brightness(0.9)',
          }}
        />
        <Tooltip title="Add to Favorites">
          <IconButton
            onClick={toggleFavorite}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: '#ffffff',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
          >
            {isFavorite ? (
              <Favorite style={{ color: '#f44336' }} />
            ) : (
              <FavoriteBorder style={{ color: '#757575' }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      <CardContent style={{ flexGrow: 1 }}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
          }}
        >
          <Typography variant="h6">{name}</Typography>
          <Chip
            icon={<Healing fontSize="small" />}
            label="Homeopathic"
            size="small"
            color="primary"
            variant="outlined"
          />
        </Box>

        <Typography
          variant="body2"
          style={{
            color: '#757575',
            marginBottom: '16px',
            flexGrow: 1,
          }}
        >
          {description}
        </Typography>

        {additionalInfo?.tags && (
          <Box style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {additionalInfo.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                color="secondary"
                variant="outlined"
              />
            ))}
          </Box>
        )}

        <Typography
          variant="h6"
          style={{
            fontWeight: 'bold',
          }}
        >
          {price}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          fullWidth
          variant="contained"
          startIcon={<ShoppingCart />}
          style={{
            textTransform: 'none',
            borderRadius: '8px',
            padding: '8px 0',
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
