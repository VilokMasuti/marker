interface Rating {
  rate: number;
  count: number;
}

interface StarProps {
  rating: Rating;
}

const Star: React.FC<StarProps> = ({ rating }) => {
  const size = 5;

  return (
    <div className="star-rating flex">
      {Array(size)
        .fill("")
        .map((_, index) => {
          const starValue = index + 1;
          const starClass = rating.rate >= starValue ? "text-yellow-500" : "text-gray-300";

          return (
            <span key={index} className={`star ${starClass} text-2xl`}>
              &#9733;
            </span>
          );
        })}
    </div>
  );
};

export default Star;
