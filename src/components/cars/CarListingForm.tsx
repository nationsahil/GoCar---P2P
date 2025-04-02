import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  InputAdornment,
  Alert,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  make: Yup.string().required('Car make is required'),
  model: Yup.string().required('Car model is required'),
  year: Yup.number()
    .min(2000, 'Car must be from 2000 or newer')
    .max(new Date().getFullYear(), 'Invalid year')
    .required('Year is required'),
  registrationNumber: Yup.string()
    .matches(/^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/, 'Enter a valid registration number')
    .required('Registration number is required'),
  basePrice: Yup.number()
    .min(500, 'Minimum price is ₹500')
    .required('Base price is required'),
  location: Yup.string().required('Location is required'),
  description: Yup.string()
    .min(50, 'Description must be at least 50 characters')
    .required('Description is required'),
});

const carTypes = [
  'Hatchback',
  'Sedan',
  'SUV',
  'MUV',
  'Luxury',
];

const cities = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
];

const features = [
  'Air Conditioning',
  'Power Steering',
  'Power Windows',
  'Anti-lock Braking',
  'Airbags',
  'Music System',
  'Bluetooth',
  'Parking Sensors',
  'Reverse Camera',
  'GPS Navigation',
];

export default function CarListingForm() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [chauffeurDriven, setChauffeurDriven] = useState(false);

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files);
      setImages((prev) => [...prev, ...newImages].slice(0, 10)); // Maximum 10 images
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom align="center">
            List Your Car
          </Typography>

          <Formik
            initialValues={{
              make: '',
              model: '',
              year: new Date().getFullYear(),
              registrationNumber: '',
              type: '',
              basePrice: '',
              location: '',
              description: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const carData = {
                ...values,
                features: selectedFeatures,
                chauffeurDriven,
                images,
              };
              console.log(carData);
              // Implement car listing submission logic here
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, isValid }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="make"
                      label="Car Make"
                      value={values.make}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.make && Boolean(errors.make)}
                      helperText={touched.make && errors.make}
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="model"
                      label="Car Model"
                      value={values.model}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.model && Boolean(errors.model)}
                      helperText={touched.model && errors.model}
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="year"
                      label="Year"
                      type="number"
                      value={values.year}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.year && Boolean(errors.year)}
                      helperText={touched.year && errors.year}
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="registrationNumber"
                      label="Registration Number"
                      value={values.registrationNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.registrationNumber && Boolean(errors.registrationNumber)}
                      helperText={touched.registrationNumber && errors.registrationNumber}
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Car Type</InputLabel>
                      <Select
                        name="type"
                        value={values.type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {carTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="basePrice"
                      label="Base Price per Day"
                      type="number"
                      value={values.basePrice}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.basePrice && Boolean(errors.basePrice)}
                      helperText={touched.basePrice && errors.basePrice}
                      margin="normal"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Location</InputLabel>
                      <Select
                        name="location"
                        value={values.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {cities.map((city) => (
                          <MenuItem key={city} value={city}>
                            {city}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="description"
                      label="Car Description"
                      multiline
                      rows={4}
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.description && Boolean(errors.description)}
                      helperText={touched.description && errors.description}
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Car Features
                    </Typography>
                    <Grid container spacing={1}>
                      {features.map((feature) => (
                        <Grid item xs={12} sm={6} md={4} key={feature}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={selectedFeatures.includes(feature)}
                                onChange={() => handleFeatureToggle(feature)}
                              />
                            }
                            label={feature}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={chauffeurDriven}
                          onChange={(e) => setChauffeurDriven(e.target.checked)}
                        />
                      }
                      label="Available with Chauffeur"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Car Images
                    </Typography>
                    <Button variant="outlined" component="label" fullWidth>
                      Upload Images
                      <input
                        type="file"
                        hidden
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </Button>
                    {images.length > 0 && (
                      <Alert severity="info" sx={{ mt: 1 }}>
                        {images.length} image(s) selected
                      </Alert>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                      size="large"
                      disabled={!isValid}
                      sx={{ mt: 2 }}
                    >
                      List Your Car
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
}