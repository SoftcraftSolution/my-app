import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Rating, TextField, Container, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PublicIcon from '@mui/icons-material/Public'; // Import the Public icon from Material-UI

const StyledContainer = styled(Container)({
  maxWidth: '100%',
  minHeight: '100vh', // Ensure the container takes up at least the full viewport height
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px',
  border: '1px solid #ccc',
  borderRadius: '0px',
  textAlign: 'center',
});

const AddPhotosButton = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '16px auto',
  padding: '8px 16px',
  borderRadius: '30px',
  width: '75vw',
  gap: '8px', // Adds space between icon and text
  textTransform: 'capitalize', // Transform text to capitalize
});

const PostReviewButton = styled(Button)({
  fontWeight: 400,
  width: '95vw', // Full width of viewport
  backgroundColor: '#1A73E8', // Background color set to #1A73E8
  borderRadius: '20px', // Rounded corners
  marginTop: 'auto', // Align to the bottom
  marginBottom: '55px', // Provide some spacing from the bottom
  textTransform: 'capitalize', // Transform text to capitalize
});

const ProfileAvatar = styled(Avatar)({
  backgroundColor: '#1A73E8', // Background color for the avatar circle
  width: '32px', // Adjust size of the avatar
  height: '32px',
  marginRight: '8px', // Add margin to separate from text
});

const ReviewUI = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null); // For handling image upload
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []); // Empty dependency array ensures effect runs only once on mount

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]); // Assuming single file upload
  };

  const handleSubmit = async () => {
    if (rating >= 3) {
      window.location.href = 'https://accounts.google.com/o/oauth2/auth?...'; // Replace with actual Google OAuth URL
      return;
    }

    const formData = new FormData();
    formData.append('rating', rating);
    formData.append('comment', comment);
    formData.append('image', image);

    try {
      const response = await fetch('https://ambulance-booking-backend.vercel.app/user/review', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to post review');
      }

      const data = await response.json();
      console.log('Review posted successfully:', data);

      // Update reviews state to include the newly posted review
      setReviews([...reviews, data.review]);

      // Optionally, reset form fields or show success message
      setRating(0);
      setComment('');
      setImage(null); // Reset image state if needed
    } catch (error) {
      console.error('Error posting review:', error);
      // Handle error state or retry logic here
    }
  };

  return (
    <StyledContainer>
      <Box display="flex" alignItems="flex-start" justifyContent="flex-start" textAlign="left" my={1}>
        <ProfileAvatar>
          R {/* Replace with the initial or icon for the profile photo */}
        </ProfileAvatar>
        <Box>
          <Typography variant="body2" fontWeight="bold" marginRight={13} fontFamily="sans-serif" fontSize={21}>Rahul Kannoujia</Typography>
          <Typography variant="caption" fontSize={13}>Posting publicly across Google</Typography>
        </Box>
      </Box>

      <Box mt={2}>
        <Rating
          name="rating"
          value={rating}
          onChange={handleRatingChange}
          iconSize={35} // Increase the size of the star icons to 50px
          sx={{
            '& .MuiRating-iconFilled': { fontSize: '35px' }, // Adjust icon size via MuiRating-iconFilled class
            '& .MuiRating-iconHover': { fontSize: '35px' }, // Adjust icon size for hover state
            '& .MuiRating-iconEmpty': { fontSize: '35px' },
            '& .MuiRating-icon': {
              fontSize: '35px', // Adjust overall icon size
              margin: '0 7px', // Add margin around each star icon
            },
          }} // Adjust icon size for empty state
        />
      </Box>
      <TextField
        id="comment"
        label="Write a review"
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        value={comment}
        onChange={handleCommentChange}
        sx={{ my: 2 }}
      />
      <input accept="image/*" style={{ display: 'none' }} id="contained-button-file" type="file" onChange={handleImageChange} />
      <label htmlFor="contained-button-file">
        <AddPhotosButton variant="outlined" component="span" startIcon={<AddAPhotoIcon />}>
          Add Photos
        </AddPhotosButton>
      </label>
      <PostReviewButton variant="contained" color="primary" onClick={handleSubmit}>
        Post
      </PostReviewButton>
    </StyledContainer>
  );
};

export default ReviewUI;
