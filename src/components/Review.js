import React, { useState } from 'react';
import { Box, Typography, Button, Rating, TextField, Container, Avatar, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom

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
  const navigate = useNavigate(); // Access the navigate function from react-router-dom

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
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
    // Example submission logic, adjust as needed
    if (rating >= 3) {
      window.location.href = 'https://www.google.com/search?gs_ssp=eJzj4tVP1zc0rDQxzCrKMMkyYLRSNagwTko1T7RMNk8CAjMjgxQrgwpTQxNLAwtLizTjFKNEo8Q0L-Hi_LSS5KLEtBKF4vyc0pLM_LxiADiqF3A&q=softcraft+solutions&oq=soft&gs_lcrp=EgZjaHJvbWUqFQgDEC4YJxivARjHARiABBiKBRiOBTIGCAAQRRg8MgYIARBFGDwyBggCEEUYPDIVCAMQLhgnGK8BGMcBGIAEGIoFGI4FMgYIBBBFGDkyDQgFEAAYgwEYsQMYgAQyEwgGEC4YgwEYxwEYsQMY0QMYgAQyBggHEEUYPNIBCDI0ODFqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8#lrd=0x3be7a9c7bbbb620d:0x51490898f3d2a2af,3,,,,&wptab=si:ACC90nwjPmqJHrCEt6ewASzksVFQDX8zco_7MgBaIawvaF4-7lzfQ5f3eSADC5iZ-gbsqeOt28b6hstUu5vuZMKn1C4KLa83977NPr6BBCQqLyA0h7_tvBblmq-PQ0SQWOVA2J9mTJ7meLejRGhlcK-lwOMDm2Nflw%3D%3D';
      return;
    }

    const formData = new FormData();
    formData.append('rating', rating);
    formData.append('comment', comment);
    formData.append('image',images)


    try {
      const response = await axios.post('https://ambulance-booking-backend.vercel.app/user/review', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log("after hit the api");
      console.log(response.data);

      if (response.data.message !== "Review created successfully") {
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
            '& .MuiRating-iconFilled': { fontSize: '35px' },
            '& .MuiRating-iconHover': { fontSize: '35px' },
            '& .MuiRating-iconEmpty': { fontSize: '35px' },
            '& .MuiRating-icon': {
              fontSize: '35px',
              margin: '0 7px',
            },
          }}
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
