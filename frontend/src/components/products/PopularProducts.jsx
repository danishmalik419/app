import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Box, 
  Chip, 
  Tabs, 
  Tab, 
  useTheme 
} from '@mui/material';
import { 
  LocalPharmacy, 
  Healing, 
  FilterList 
} from '@mui/icons-material';
import { ProductCard } from './ProductCard';

// Extended product data with more details
const products = [
  {
    id: 1,
    name: 'Arnica Montana',
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=300&h=300',
    price: '₹199',
    description: 'For bruises, injuries and muscle soreness',
    category: 'Pain Relief',
    tags: ['Sports', 'Injury']
  },
  {
    id: 2,
    name: 'Nux Vomica',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300&h=300',
    price: '₹149',
    description: 'For digestive issues and stress relief',
    category: 'Digestive Health',
    tags: ['Stress', 'Digestion']
  },
  {
    id: 3,
    name: 'Rhus Tox',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=300&h=300',
    price: '₹179',
    description: 'For joint pains and sprains',
    category: 'Pain Relief',
    tags: ['Joints', 'Mobility']
  },
];

export function PopularProducts() {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get unique categories
  const categories = ['All', ...new Set(products.map(p => p.category))];

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <Container sx={{ py: 6 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4 
      }}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2 
          }}
        >
          <LocalPharmacy color="primary" fontSize="large" />
          Popular Products
        </Typography>
        
        {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FilterList color="action" />
          <Tabs
            value={selectedCategory}
            onChange={(e, newValue) => setSelectedCategory(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {categories.map((category) => (
              <Tab 
                key={category} 
                label={category} 
                value={category} 
                sx={{ 
                  textTransform: 'none',
                  fontWeight: selectedCategory === category ? 'bold' : 'normal'
                }}
              />
            ))}
          </Tabs>
        </Box> */}
      </Box>

      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard 
              {...product} 
              additionalInfo={{
                tags: product.tags
              }}
            />
          </Grid>
        ))}
      </Grid>

      {filteredProducts.length === 0 && (
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 4, 
            bgcolor: theme.palette.background.default, 
            borderRadius: 2 
          }}
        >
          <Healing color="disabled" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No products found in this category
          </Typography>
        </Box>
      )}
    </Container>
  );
}