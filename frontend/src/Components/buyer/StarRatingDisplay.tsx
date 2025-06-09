import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

/**
 * StarRatingDisplay Component - Displays star ratings as read-only icons
 * @param rating - The rating value (0-5, can include decimals)
 */
interface StarRatingDisplayProps {
  rating: number;
}

export const StarRatingDisplay: React.FC<StarRatingDisplayProps> = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FontAwesomeIcon key={`full-${i}`} icon={faStar} className="star-rating-icon filled" />
    );
  }

  // Half star
  if (hasHalfStar) {
    stars.push(
      <FontAwesomeIcon key="half\" icon={faStarHalfAlt} className="star-rating-icon filled" />
    );
  }

  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FontAwesomeIcon key={`empty-${i}`} icon={faStarEmpty} className="star-rating-icon empty" />
    );
  }

  return <span className="star-rating-display">{stars}</span>;
};