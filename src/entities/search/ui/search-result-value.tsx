import { type FC } from 'react';

import { config } from '../config';

import styles from './styles.module.css';

import { Button } from '@/shared/components/button';
import Typography from '@/shared/components/typography';
import useMediaQuery from '@/shared/hooks/use-media-query';

interface SearchResultValueProps {
  text: string;
  toggleSearch: () => void;
}

const SearchResultValue: FC<SearchResultValueProps> = ({ text, toggleSearch }) => {
  const isSmallScreen = useMediaQuery('(max-width: 735px)');

  return (
    <div
      className={`${styles.content_search_wrapper} absolute ${isSmallScreen ? 'top-[200px]' : 'top-[200px]'}`}
    >
      <Typography
        variant={'p'}
        className={`${isSmallScreen ? 'max-w-[375px] text-xl' : 'text-2xl'} text-center  font-semibold`}
      >
        {text}
      </Typography>
      {isSmallScreen ? (
        <div className='text-semibold text-main' onClick={toggleSearch}>
          {config.close}
        </div>
      ) : (
        <Button className={`h-[50px] w-[220px]`} onClick={toggleSearch}>
          {config.close}
        </Button>
      )}
    </div>
  );
};

export default SearchResultValue;
