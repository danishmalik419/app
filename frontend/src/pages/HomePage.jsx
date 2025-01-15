import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Toolbar,
  Typography
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  ChevronRight as ChevronRightIcon,
  Timeline as TimelineIcon,
  CardGiftcard as GiftIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

const HomePage = () => {
  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

        {/* Statistics Overview */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            { icon: <TimelineIcon />, title: 'Total Activity', value: '28', color: 'primary.main' },
            { icon: <GiftIcon />, title: 'Total Donations', value: '$2,456', color: 'success.main' },
            { icon: <SettingsIcon />, title: 'Settings Updated', value: '2 days ago', color: 'secondary.main' }
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper elevation={1} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: item.color + '15', color: item.color }}>
                    {item.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {item.title}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {item.value}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Main Sections */}
        <Grid container spacing={3}>
          {/* Recent Activity */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Your latest actions and updates
                </Typography>
                <List>
                  {[1, 2, 3].map((item) => (
                    <ListItem
                      key={item}
                      sx={{ bgcolor: 'grey.50', borderRadius: 1, mb: 1 }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <TimelineIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`Activity ${item}`}
                        secondary="2 hours ago"
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end">
                          <ChevronRightIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Donations */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Donations
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Track your contribution history
                </Typography>
                <List>
                  {[1, 2, 3].map((item) => (
                    <ListItem
                      key={item}
                      sx={{ bgcolor: 'grey.50', borderRadius: 1, mb: 1 }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'success.main' }}>
                          <GiftIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`$${item * 50}.00`}
                        secondary={`Donation #${item}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end">
                          <ChevronRightIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;