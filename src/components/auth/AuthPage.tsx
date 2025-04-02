import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Alert,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Enter a valid Indian mobile number')
    .required('Phone number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  name: Yup.string().required('Name is required'),
  aadhaar: Yup.string()
    .matches(/^\d{12}$/, 'Enter a valid 12-digit Aadhaar number')
    .required('Aadhaar number is required'),
  pan: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Enter a valid PAN number')
    .required('PAN number is required'),
  drivingLicense: Yup.string()
    .matches(/^[A-Z]{2}\d{13}$/, 'Enter a valid driving license number')
    .required('Driving license number is required'),
});

const steps = ['Basic Details', 'Identity Verification', 'Document Upload'];

export default function AuthPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSendOtp = () => {
    // Implement OTP sending logic here
    setShowOtpField(true);
  };

  const handleVerifyOtp = () => {
    // Implement OTP verification logic here
    if (otp === '123456') { // This is just for demonstration
      handleNext();
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              name="phone"
              label="Phone Number"
              margin="normal"
            />
            {showOtpField ? (
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  label="Enter OTP"
                  margin="normal"
                />
                <Button
                  variant="contained"
                  onClick={handleVerifyOtp}
                  sx={{ mt: 2 }}
                >
                  Verify OTP
                </Button>
              </Box>
            ) : (
              <Button
                variant="contained"
                onClick={handleSendOtp}
                sx={{ mt: 2 }}
              >
                Send OTP
              </Button>
            )}
            <TextField
              fullWidth
              name="email"
              label="Email"
              type="email"
              margin="normal"
            />
            <TextField
              fullWidth
              name="name"
              label="Full Name"
              margin="normal"
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              name="aadhaar"
              label="Aadhaar Number"
              margin="normal"
            />
            <TextField
              fullWidth
              name="pan"
              label="PAN Number"
              margin="normal"
            />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              name="drivingLicense"
              label="Driving License Number"
              margin="normal"
            />
            <Alert severity="info" sx={{ mt: 2 }}>
              Please ensure all uploaded documents are clear and valid.
            </Alert>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={4}>
                <Button variant="outlined" fullWidth component="label">
                  Upload Aadhaar
                  <input type="file" hidden accept="image/*" />
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button variant="outlined" fullWidth component="label">
                  Upload PAN
                  <input type="file" hidden accept="image/*" />
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button variant="outlined" fullWidth component="label">
                  Upload License
                  <input type="file" hidden accept="image/*" />
                </Button>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom align="center">
            User Registration
          </Typography>
          
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Formik
            initialValues={{
              phone: '',
              email: '',
              name: '',
              aadhaar: '',
              pan: '',
              drivingLicense: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
              // Implement registration logic here
            }}
          >
            {({ isValid }) => (
              <Form>
                {renderStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={!isValid}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      disabled={!isValid}
                    >
                      Next
                    </Button>
                  )}
                </Box>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
}