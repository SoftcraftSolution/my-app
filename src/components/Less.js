import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Box)({
  maxWidth: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px',
  textAlign: 'center',
});

const ReviewSubmittedPage = () => {
  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Your Review has been submitted
      </Typography>
      <Typography variant="body1">
        Thank you for your valuable feedback!
      </Typography>
    </StyledContainer>
  );
};

export default ReviewSubmittedPage;
