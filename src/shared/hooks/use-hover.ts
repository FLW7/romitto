import { useState, type MouseEventHandler } from 'react';

const useHover = (): [
  boolean,
  MouseEventHandler<HTMLDivElement>,
  MouseEventHandler<HTMLDivElement>,
] => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = () => {
    setIsHovered(true);
  };

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
    setIsHovered(false);
  };

  return [isHovered, handleMouseEnter, handleMouseLeave];
};

export default useHover;
