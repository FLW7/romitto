import { useState, type SVGProps } from 'react';

interface UserLogoProps extends SVGProps<SVGSVGElement> {
  colorDefault?: string;
  colorHover?: string;
}

const UserLogo = ({
  colorDefault = '#1E1E1E',
  colorHover = '#F16660',
  ...props
}: UserLogoProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      width='26'
      height='26'
      viewBox='0 0 26 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      {...props}
    >
      <path
        d='M12.2477 11.058C15.0025 11.058 17.2357 8.82479 17.2357 6.07C17.2357 3.31522 15.0025 1.08203 12.2477 1.08203C9.4929 1.08203 7.2597 3.31522 7.2597 6.07C7.2597 8.82479 9.4929 11.058 12.2477 11.058Z'
        stroke={isHovered ? colorHover : colorDefault}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2.16797 24.9164V22.0734C2.16797 18.7538 4.85774 16.0811 8.16035 16.0811H17.1319C20.4515 16.0811 23.1243 18.7708 23.1243 22.0734V24.9164'
        stroke={isHovered ? colorHover : colorDefault}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default UserLogo;
