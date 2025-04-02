import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Chip,
  Rating,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  FilterList,
  Sort,
  LocationOn,
  DirectionsCar,
  Person,
  Close,
} from '@mui/icons-material';

interface CarType {
  id: string;
  make: string;
  model: string;
  year: number;
  type: string;
  price: number;
  location: string;
  rating: number;
  reviews: number;
  features: string[];
  image: string;
  chauffeurAvailable: boolean;
}

// Mock data for demonstration
const mockCars: CarType[] = [
  {
    id: '1',
    make: 'Maruti Suzuki',
    model: 'Swift',
    year: 2022,
    type: 'Hatchback',
    price: 1500,
    location: 'Mumbai',
    rating: 4.5,
    reviews: 32,
    features: ['Air Conditioning', 'Power Steering', 'Music System'],
    image: 'https://example.com/car1.jpg',
    chauffeurAvailable: true,
  },
  // Add more mock cars here
];

export default function CarSearch() {
  const [searchParams, setSearchParams] = useState({
    location: '',
    startDate: null,
    endDate: null,
    priceRange: [500, 10000],
    carType: '',
  });
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);

  const handleFilterChange = (field: string, value: any) => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBookNow = (car: CarType) => {
    setSelectedCar(car);
    setBookingDialogOpen(true);
  };

  const handleBookingConfirm = () => {
    // Implement booking logic here
    console.log('Booking confirmed for:', selectedCar);
    setBookingDialogOpen(false);
  };

  const FilterDialog = () => (
    <Dialog
      open={filterDialogOpen}
      onClose={() => setFilterDialogOpen(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Filters
        <IconButton
          onClick={() => setFilterDialogOpen(false)}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <Typography gutterBottom>Price Range (₹ per day)</Typography>
          <Slider
            value={searchParams.priceRange}
            onChange={(_, value) => handleFilterChange('priceRange', value)}
            valueLabelDisplay="auto"
            min={500}
            max={10000}
            step={100}
          />

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Car Type</InputLabel>
            <Select
              value={searchParams.carType}
              onChange={(e) => handleFilterChange('carType', e.target.value)}
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="Hatchback">Hatchback</MenuItem>
              <MenuItem value="Sedan">Sedan</MenuItem>
              <MenuItem value="SUV">SUV</MenuItem>
              <MenuItem value="Luxury">Luxury</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
    </Dialog>
  );

  const BookingDialog = () => (
    <Dialog
      open={bookingDialogOpen}
      onClose={() => setBookingDialogOpen(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Confirm Booking</DialogTitle>
      <DialogContent>
        {selectedCar && (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">
              {selectedCar.make} {selectedCar.model} ({selectedCar.year})
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              {selectedCar.location}
            </Typography>

            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle1">Booking Details:</Typography>
              <Typography>
                Duration: {searchParams.startDate?.toLocaleDateString()} -{' '}
                {searchParams.endDate?.toLocaleDateString()}
              </Typography>
              <Typography>
                Total Price: ₹
                {selectedCar.price *
                  (searchParams.startDate && searchParams.endDate
                    ? Math.ceil(
                        (searchParams.endDate.getTime() -
                          searchParams.startDate.getTime()) /
                          (1000 * 60 * 60 * 24)
                      )
                    : 1)}
              </Typography>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setBookingDialogOpen(false)}>Cancel</Button>
        <Button variant="contained" onClick={handleBookingConfirm}>
          Confirm Booking
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Location"
              value={searchParams.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              InputProps={{
                startAdornment: <LocationOn color="action" />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DatePicker
              label="Start Date"
              value={searchParams.startDate}
              onChange={(date) => handleFilterChange('startDate', date)}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DatePicker
              label="End Date"
              value={searchParams.endDate}
              onChange={(date) => handleFilterChange('endDate', date)}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={6} md={1.5}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => setFilterDialogOpen(true)}
              sx={{ height: '100%' }}
            >
              Filters
            </Button>
          </Grid>
          <Grid item xs={6} md={1.5}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Sort />}
              sx={{ height: '100%' }}
            >
              Sort
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          {mockCars.map((car) => (
            <Grid item xs={12} sm={6} md={4} key={car.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={car.image}
                  alt={`${car.make} ${car.model}`}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {car.make} {car.model} ({car.year})
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={car.rating} readOnly size="small" />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      ({car.reviews} reviews)
                    </Typography>
                  </Box>
                  <Typography color="text.secondary" gutterBottom>
                    <LocationOn fontSize="small" sx={{ mr: 0.5 }} />
                    {car.location}
                  </Typography>
                  <Box sx={{ mb: 1 }}>
                    {car.features.map((feature) => (
                      <Chip
                        key={feature}
                        label={feature}
                        size="small"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </Box>
                  {car.chauffeurAvailable && (
                    <Chip
                      icon={<Person />}
                      label="Chauffeur Available"
                      color="primary"
                      size="small"
                      sx={{ mb: 1 }}
                    />
                  )}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 2,
                    }}
                  >
                    <Typography variant="h6" color="primary">
                      ₹{car.price}/day
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<DirectionsCar />}
                      onClick={() => handleBookNow(car)}
                    >
                      Book Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <FilterDialog />
        <BookingDialog />
      </Box>
    </LocalizationProvider>
  );
}