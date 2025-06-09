import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface StarRatingInputProps {
  rating: number;
  setRating: (rating: number) => void;
}

export const StarRatingInput: React.FC<StarRatingInputProps> = ({ rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleStarClick = (starValue: number) => {
    setRating(starValue);
  };

  const handleStarHover = (starValue: number) => {
    setHoverRating(starValue);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="star-rating-input">
      {[1, 2, 3, 4, 5].map((starValue) => (
        <FontAwesomeIcon
          key={starValue}
          icon={faStar}
          className={`star-rating-input-icon ${starValue <= displayRating ? 'filled' : 'empty'}`}
          onClick={() => handleStarClick(starValue)}
          onMouseEnter={() => handleStarHover(starValue)}
          onMouseLeave={handleStarLeave}
        />
      ))}
    </div>
  );
};