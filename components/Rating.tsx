
import React from 'react';
import { StarIcon } from './icons';

interface RatingProps {
  rating: number;
  maxRating?: number;
}

const Rating: React.FC<RatingProps> = ({ rating, maxRating = 5 }) => {
  return (
    <div className="flex items-center">
      {[...Array(maxRating)].map((_, index) => (
        <StarIcon
          key={index}
          className={`w-5 h-5 ${
            index < Math.round(rating) ? 'text-yellow-400' : 'text-gray-600'
          }`}
        />
      ))}
      <span className="ml-2 text-sm font-medium text-gray-300">{rating.toFixed(1)}</span>
    </div>
  );
};

export default Rating;
