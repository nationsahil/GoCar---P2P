import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Paper,
import {
  DirectionsCar,
  Security,
  Payment,
  VerifiedUser,
  LocalGasStation,
  CarRental,
  SupportAgent,
  Language,
  LocationOn
} from '@mui/icons-material';
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const features = [
  {
    icon: <Security fontSize="large" color="primary" />,
    title: 'Secure & Verified',
    description: 'Thorough verification with Aadhaar/PAN and driving license checks',
  },
  {
    icon: <Payment fontSize="large" color="primary" />,
    title: 'Flexible Payments',
    description: 'Multiple payment options including UPI, cards, and digital wallets',
  },
  {
    icon: <SupportAgent fontSize="large" color="primary" />,
    title: '24/7 Support',
    description: 'Round-the-clock customer support and roadside assistance',
  },
  {
    icon: <Language fontSize="large" color="primary" />,
    title: 'Multi-Language',
    description: 'Support for English, Hindi, and regional languages',
  },
  {
    icon: <LocationOn fontSize="large" color="primary" />,
    title: 'Pan India',
    description: 'Available across metro, tier-1, and tier-2 cities',
  },
  {
    icon: <DirectionsCar fontSize="large" color="primary" />,
    title: 'Wide Vehicle Selection',
    description: 'Choose from various car types and models'
  },
  {
    icon: <CarRental fontSize="large" color="primary" />,
    title: 'Flexible Options',
    description: 'Choose between self-drive and chauffeur-driven rentals'
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [vehicleType, setVehicleType] = useState('all');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setSelectedFeatures(prev =>
      checked ? [...prev, feature] : prev.filter(f => f !== feature)
    );
  };

  const handleSearch = () => {
    navigate('/cars', {
      state: {
        location,
        priceRange,
        vehicleType,
        startDate,
        endDate,
        features: selectedFeatures
      }
    });
  };

  return (
    <Box>
      {/* Search Section */}
      <Paper sx={{ p: 4, mb: 4 }} elevation={2}>
        <Typography variant="h5" gutterBottom>
          Find the perfect car for your needs
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Location"
              variant="outlined"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter city or area"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Slider
              value={priceRange}
              onChange={(_, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              min={500}
              max={5000}
              step={500}
              marks={[
                { value: 500, label: '₹500' },
                { value: 2500, label: '₹2500' },
                { value: 5000, label: '₹5000' },
              ]}
            />
            <Typography variant="body2">
              Price range: ₹{priceRange[0]} - ₹{priceRange[1]}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Vehicle Type</InputLabel>
              <Select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                label="Vehicle Type"
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="hatchback">Hatchback</MenuItem>
                <MenuItem value="sedan">Sedan</MenuItem>
                <MenuItem value="suv">SUV</MenuItem>
                <MenuItem value="luxury">Luxury</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={() => navigate('/cars')}
              sx={{ mt: 2 }}
            >
              Search Cars
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(https://source.unsplash.com/random?car)',
          minHeight: '300px',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.5)',
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
                minHeight: '500px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                Rent Cars Your Way
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                India's trusted P2P car rental platform. Rent from local car owners or
                list your car to earn extra income.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/cars')}
                >
                  Rent a Car
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  color="inherit"
                  onClick={() => navigate('/list-car')}
                >
                  List Your Car
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Features Section */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Why Choose Us
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  p: 2,
                }}
                elevation={2}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  {feature.icon}
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            How It Works
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://source.unsplash.com/random?driving-license"
                  alt="Verification"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3">
                    1. Verify Your Account
                  </Typography>
                  <Typography color="text.secondary">
                    Complete your profile verification with Aadhaar/PAN and driving
                    license for a secure experience.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://source.unsplash.com/random?car-rental"
                  alt="Book or List"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3">
                    2. Book or List a Car
                  </Typography>
                  <Typography color="text.secondary">
                    Browse available cars to rent or list your car with competitive
                    pricing and availability.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://source.unsplash.com/random?car-key"
                  alt="Start Driving"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3">
                    3. Start Your Journey
                  </Typography>
                  <Typography color="text.secondary">
                    Pick up the car and start your journey with full insurance coverage
                    and 24/7 support.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Paper sx={{ 
        p: 4, 
        mb: 4,
        position: 'sticky',
        top: 16,
        zIndex: 1000,
        mb: 4,
        p: 3,
        boxShadow: 3
      }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={2} alignItems="center">
            {/* Date Pickers */}
            <Grid item xs={12} md={3}>
              <DatePicker
                label="Pickup Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                minDate={new Date()}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <DatePicker
                label="Return Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                minDate={startDate || new Date()}
              />
            </Grid>
            {/* Feature Checkboxes */}
            <Grid item xs={12} md={3}>
              <FormGroup row>
                <FormControlLabel
                  control={<Checkbox checked={selectedFeatures.includes('ac')} />}
                  label="AC"
                  onChange={(e, checked) => handleFeatureChange('ac', checked)}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedFeatures.includes('automatic')} />}
                  label="Automatic"
                  onChange={(e, checked) => handleFeatureChange('automatic', checked)}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleSearch}
              >
                Search Cars
              </Button>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </Paper>
    </Box>
  );
}