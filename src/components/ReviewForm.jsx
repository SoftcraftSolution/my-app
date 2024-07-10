import React, { useState } from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';

const ReviewForm = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <FormContainer>
      <h2>Balaji Auto Parts & Service Center</h2>
      <ProfileSection>
        <Avatar src="https://via.placeholder.com/40" alt="Profile" />
        <ProfileName>Karan Nair</ProfileName>
      </ProfileSection>
      <Stars>
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;

          return (
            <Star
              key={index}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setRating(ratingValue)}
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            >
              <FaStar />
            </Star>
          );
        })}
      </Stars>
      <TextArea placeholder="Share details of your own experience at this place" />
      <AddPhotosButton>Add photos and videos</AddPhotosButton>
      <ButtonContainer>
        <CancelButton>Cancel</CancelButton>
        <PostButton>Post</PostButton>
      </ButtonContainer>
    </FormContainer>
  );
};

export default ReviewForm;

// Styled Components
const FormContainer = styled.div`
  width: 90%;
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 600px) {
    width: 100%;
    margin: 10px;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ProfileName = styled.span`
  font-weight: bold;
`;

const Stars = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const Star = styled.div`
  cursor: pointer;
  transition: color 200ms;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  resize: none;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const AddPhotosButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CancelButton = styled.button`
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
`;

const PostButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;
