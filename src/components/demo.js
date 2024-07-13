import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

import { BrowserRouter as Router, Routes, Route, useParams,useLocation } from 'react-router-dom';

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

const Demo = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
      const id = searchParams.get('id');
      console.log('ID from query parameter:', id);
  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
       Demo
      </Typography>
      <Typography variant="body1">
        Demo
      </Typography>
    </StyledContainer>
  );
};

export default Demo;
