import { useState, type SVGProps } from 'react';

interface SearchIconProps extends SVGProps<SVGSVGElement> {
  colorDefault?: string;
  colorHover?: string;
}

const SearchIcon = ({
  colorDefault = '#1E1E1E',
  colorHover = '#FBBB1F',
  ...props
}: SearchIconProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
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
        d='M11.8835 20.7885C6.96518 20.7885 2.97852 16.8018 2.97852 11.8835C2.97852 6.96518 6.96518 2.97852 11.8835 2.97852C16.8018 2.97852 20.7885 6.96518 20.7885 11.8835C20.7885 16.8018 16.8018 20.7885 11.8835 20.7885Z'
        stroke={isHovered ? colorHover : colorDefault}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M23.0208 23.0198L18.5684 18.5673'
        stroke={isHovered ? colorHover : colorDefault}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default SearchIcon;
