// src/Review.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    border: '1px solid #ccc',
    borderRadius: theme.spacing(1),
    maxWidth: 500,
    margin: 'auto',
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  stars: {
    display: 'flex',
    alignItems: 'center',
  },
  star: {
    cursor: 'pointer',
  },
  textField: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const Review = () => {
  const classes = useStyles();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    // Handle the submission logic here
    console.log('Rating:', rating);
    console.log('Comment:', comment);
  };

  return (
    <Container className={classes.container}>
      <div className={classes.header}>
        <Avatar className={classes.avatar}>RK</Avatar>
        <div>
          <Typography variant="h6">Rahul Kannoujia</Typography>
          <Typography variant="body2" color="textSecondary">
            Posting publicly across Google
          </Typography>
        </div>
      </div>
      <Typography variant="h5">SoftCraft Solutions</Typography>
      <div className={classes.stars}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={classes.star}
            onClick={() => handleStarClick(index + 1)}
          >
            {index < rating ? <StarIcon /> : <StarBorderIcon />}
          </div>
        ))}
      </div>
      <TextField
        className={classes.textField}
        variant="outlined"
        multiline
        rows={4}
        placeholder="Write a review..."
        value={comment}
        onChange={handleCommentChange}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Post
      </Button>
    </Container>
  );
};

export default Review;
