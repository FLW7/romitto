import { type FC } from 'react';

import HeartOrange from '@/assets/icons/heart-orange.svg';
import HeartRounded from '@/assets/icons/heart-rounded.svg';

interface HeartIconProps {
  isLiked: boolean;
  width: number;
  height: number;
  className: string;
  onClick: (id: number) => void;
}

const HeartIcon: FC<HeartIconProps> = ({
  isLiked,
  width,
  height,
  className,
  onClick,
}) => {
  const IconComponent = isLiked ? HeartOrange : HeartRounded;

  return (
    <IconComponent
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  );
};

export default HeartIcon;
