import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Rating, TextField, Container, Avatar, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)({
  maxWidth: '100%',
  minHeight: '100vh',
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
  gap: '8px',
  textTransform: 'capitalize',
});

const PostReviewButton = styled(Button)({
  fontWeight: 400,
  width: '95vw',
  backgroundColor: '#1A73E8',
  borderRadius: '20px',
  marginTop: 'auto',
  marginBottom: '55px',
  textTransform: 'capitalize',
});

const ProfileAvatar = styled(Avatar)({
  backgroundColor: '#1A73E8',
  width: '32px',
  height: '32px',
  marginRight: '8px',
});

const ImagePreviewContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '10px',
  marginTop: '10px',
});

const ImagePreview = styled(Box)({
  position: 'relative',
  maxWidth: '100px',
  maxHeight: '100px',
  overflow: 'hidden',
  borderRadius: '8px',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const CancelButton = styled(IconButton)({
  position: 'absolute',
  top: '4px',
  right: '4px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '50%',
  padding: '4px',
});

const ReviewUI = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState([]); // State for selected images
  const [imagePreviews, setImagePreviews] = useState([]); // State for image previews
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false); // State for error message
  const navigate = useNavigate(); // Access the navigate function from react-router-dom

  // Retrieve pageURL from sessionStorage
  const [pageurl, setPageurl] = useState('');
  const url = sessionStorage.getItem('placeId');
  useEffect(() => {
   
    setPageurl(url || ''); // Fallback to empty string if not found
  }, []);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
    if (newValue > 0) {
      setShowErrorMessage(false); // Hide error message if a rating is selected
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleImageChange = (event) => {
    const selectedImages = Array.from(event.target.files); // Convert FileList to array
    setImages([...images, ...selectedImages]); // Add newly selected images to state

    const selectedPreviews = selectedImages.map((image) => URL.createObjectURL(image));
    setImagePreviews([...imagePreviews, ...selectedPreviews]); // Add image previews to state
  };

  const handleCancelImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);

    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      setShowErrorMessage(true); // Show error message if no rating is selected
      return;
    }

    if (rating > 3) {
      if (url) {
        console.log(url);
        window.location.href = `https://search.google.com/local/writereview?placeid=${url}`;
        return;
      } else {
        console.error("pageurl is null or undefined");
      }
    }

    const formData = new FormData();
    formData.append('rating', rating);
    formData.append('comment', comment);
    images.forEach((image, index) => {
      formData.append(`image_${index}`, image);
    });
    formData.append('qrCodeId', sessionStorage.getItem('id'));

    try {
      const response = await axios.post('https://ambulance-booking-backend.vercel.app/user/review', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('after hit the api');
      console.log(response.data);

      if (response.data.message !== 'Review created successfully') {
        throw new Error('Failed to post review');
      }

      setRating(0);
      setComment('');
      setImages([]);
      setImagePreviews([]);
      setShowSuccessMessage(true);

      navigate('/review-submitted');
    } catch (error) {
      console.error('Error posting review:', error);
    }
  };

  const name = sessionStorage.getItem('name');

  return (
    <StyledContainer>
      <Box display="flex" alignItems="flex-start" justifyContent="flex-start" textAlign="left" my={1}>
        <ProfileAvatar>
          {name ? name[0].toUpperCase() : 'U'}
        </ProfileAvatar>
        <Box>
          <Typography variant="body2" fontWeight="bold" marginRight={13} fontFamily="sans-serif" fontSize={21}>{name}</Typography>
          <Typography variant="caption" fontSize={13}>Posting publicly across Google</Typography>
        </Box>
      </Box>

      <Box mt={2}>
        <Rating
          name="rating"
          value={rating}
          onChange={handleRatingChange}
          iconSize={35}
          sx={{
            '& .MuiRating-iconFilled': { fontSize: '35px' },
            '& .MuiRating-iconHover': { fontSize: '35px' },
            '& .MuiRating-iconEmpty': { fontSize: '35px' },
            '& .MuiRating-icon': {
              fontSize: '35px',
              margin: '0 7px',
            },
          }}
        />
        {showErrorMessage && (
          <Typography sx={{ color: 'red', marginTop: '8px' }}>Please provide a star rating.</Typography>
        )}
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

      <ImagePreviewContainer>
        {imagePreviews.map((preview, index) => (
          <ImagePreview key={index}>
            <img src={preview} alt="Preview" />
            <CancelButton onClick={() => handleCancelImage(index)}>
              <ClearIcon />
            </CancelButton>
          </ImagePreview>
        ))}
      </ImagePreviewContainer>

      <PostReviewButton variant="contained" color="primary" onClick={handleSubmit}>
        Post
      </PostReviewButton>

      {rating < 3 && showSuccessMessage && (
        <Typography sx={{ marginTop: '16px', color: '#4caf50' }}>Your review has been successfully submitted!</Typography>
      )}
    </StyledContainer>
  );
};

export default ReviewUI;
