import { useEffect, useState, type FC } from 'react';

import { motion } from 'framer-motion';
import { SearchIcon } from 'lucide-react';

import { config } from '../config';

import SearchResultValue from './search-result-value';
import styles from './styles.module.css';

import ArrowLeft from '@/assets/icons/arrow-left.svg';
import Close from '@/assets/icons/close.svg';
import { ProductCard } from '@/entities/product-card';
import { Input } from '@/shared/components/input';
import { ScrollArea } from '@/shared/components/scroll-area';
import { useGetCatalog } from '@/shared/hooks/query/use-get-catalog';
import { useModal } from '@/shared/state/modal';
import { type ICartOrderItem } from '@/widgets/cart-widget/config';

interface SearchProps {
  toggleSearch: () => unknown;
}

const Search: FC<SearchProps> = ({ toggleSearch }) => {
  const { onOpen } = useModal();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCatalog, setFilteredCatalog] = useState([]);

  const { data } = useGetCatalog();

  useEffect(() => {
    if (data) {
      const value = searchQuery.toLowerCase();
      const filtered = data?.plates
        ?.filter(
          (product: ICartOrderItem) =>
            Number(product.isSubCategory) === 0 &&
            product?.name?.toLowerCase()?.includes(value),
        )
        .map((item) => ({ ...item, price: item.values[0]?.price }));

      setFilteredCatalog(filtered as any);
    }
  }, [data, searchQuery]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  const openModal = (item: any) => {
    onOpen('detailMeal', item);
  };

  const handleOpenModal = (item: any) => () => {
    if (openModal) {
      openModal(item);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className={`${styles.header_search} !bg-none`}
      >
        <div className={styles.wrapper}>
          <div className={`absolute top-[30px] w-full max-w-[800px] p-4`}>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <form className='flex items-center gap-4'>
                <ArrowLeft
                  width={18}
                  height={18}
                  onClick={toggleSearch}
                  className='cursor-pointer'
                />
                <div className={'relative flex grow'}>
                  <SearchIcon
                    className={
                      'absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-secondary'
                    }
                  />
                  <Input
                    className={`h-[50px] w-full rounded-[100px] pl-12 max-md:h-[44px]`}
                    placeholder={config.placeholder}
                    onChange={handleChange}
                    value={searchQuery}
                  />
                  <button
                    type='button'
                    className={`absolute right-6 top-1/2 z-10 -translate-y-1/2 p-2`}
                    onClick={handleClear}
                  >
                    <Close className={`stroke-secondary`} width={12} height={12} />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
          {searchQuery.length === 0 ? (
            <SearchResultValue toggleSearch={toggleSearch} text={config.enterValue} />
          ) : (
            <>
              {filteredCatalog?.length > 0 ? (
                <ScrollArea
                  className={`absolute top-[130px] h-[calc(100vh-150px)] w-full max-w-[1304px] px-8 max-md:px-4`}
                >
                  <div
                    className={`grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-2 max-[470px]:grid-cols-1`}
                  >
                    {filteredCatalog.map((item: any) => (
                      <div key={item.id} className='w-full min-w-[200px]'>
                        <ProductCard
                          item={item}
                          handleOpenModal={handleOpenModal(item)}
                        />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <SearchResultValue toggleSearch={toggleSearch} text={config.notFound} />
              )}
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Search;
