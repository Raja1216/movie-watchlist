import React from 'react';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const RatingStars = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    let remainingRating = rating;
    for (let i = 1; i <= 5; i++) {
      if (remainingRating >= 1) {
        stars.push(<FaStar key={i} />);
      } else if (remainingRating >= 0.5) {
        stars.push(<FaStarHalfAlt key={i} />);
      } else {
        stars.push(<FaStar key={i} style={{ opacity: 0.2 }} />);
      }
      remainingRating--;
    }
    return stars;
  };

  return (
    <div>
      {renderStars()}
    </div>
  );
};


export default RatingStars
