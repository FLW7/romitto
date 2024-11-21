import { useState } from 'react';

import SearchIcon from '@/entities/header-assets/search-icon/ui/search-icon';
import Search from '@/entities/search';
import { Input } from '@/shared/components/input';

const SearchBlock = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  return (
    <>
      <div className='relative mx-4 my-5 lg:hidden' onClick={toggleSearch}>
        <Input
          className='pointer-events-none h-11 rounded-full border border-black/10 bg-white'
          placeholder='Найти...'
        />
        <SearchIcon
          colorDefault='#BABABA'
          className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2'
        />
      </div>
      {isSearchOpen && <Search toggleSearch={toggleSearch} />}
    </>
  );
};

export default SearchBlock;
