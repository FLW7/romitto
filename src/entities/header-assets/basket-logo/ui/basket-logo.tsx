import { useState, type SVGProps } from 'react';

interface BasketLogoProps extends SVGProps<SVGSVGElement> {
  colorDefault?: string;
  colorHover?: string;
}

const BasketLogo = ({
  colorDefault = '#1E1E1E',
  colorHover = '#F16660',
  ...props
}: BasketLogoProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      width='24'
      height='26'
      viewBox='0 0 24 26'
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
        d='M7.23266 9.69302V7.48876M16.698 9.69302V7.48876M7.23266 7.48876H4.5C3.39543 7.48876 2.5 8.38419 2.5 9.48876V23.1229C2.5 24.2274 3.39543 25.1229 4.5 25.1229H19.4307C20.5352 25.1229 21.4307 24.2274 21.4307 23.1229V9.48876C21.4307 8.38419 20.5352 7.48876 19.4307 7.48876H16.698M7.23266 7.48876H16.698M7.23266 7.48876V5.2845C7.23266 2.84879 9.35645 0.875977 11.9653 0.875977C14.5801 0.875977 16.698 2.8543 16.698 5.2845V7.48876'
        stroke={isHovered ? colorHover : colorDefault}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M11.2468 17.9008L9.5293 16.4209'
        stroke={isHovered ? colorHover : colorDefault}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14.7965 15.0393L11.246 17.903'
        stroke={isHovered ? colorHover : colorDefault}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default BasketLogo;
