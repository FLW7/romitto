import React from 'react';
import 'tailwindcss/tailwind.css';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'p2' | 'desc';

interface TypographyProperties {
  variant: TypographyVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: 'text-[20px] sm:text-2xl font-semibold',
  h2: 'text-xl font-semibold',
  h3: 'text-xl font-semibold',
  h4: 'text-lg font-semibold',
  h5: 'text-[20px] sm:text-[24px] font-semibold',
  h6: 'text-[18px] md:text-[20px] font-semibold',
  p: 'text-[14px] md:text-[18px]',
  p2: 'text-base',
  desc: 'text-[14px]',
};

const elementMap: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  p2: 'p',
  desc: 'p',
};

const Typography: React.FC<TypographyProperties> = ({ variant, children, className }) => {
  const element = elementMap[variant];

  return React.createElement(
    element,
    { className: `typography ${variantStyles[variant]} ${className} text-primary` },
    children,
  );
};

export default Typography;
