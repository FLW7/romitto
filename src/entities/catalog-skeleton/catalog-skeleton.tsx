'use client';

import styles from './styles.module.css';

import { SkeletonWave } from '@/shared/components/skeleton';

const skeletonCatalog = Array.from({ length: 50 }).fill(null);
const skeletonStories = Array.from({ length: 3 }).fill(null);
const skeletonRecommendations = Array.from({ length: 1 }).fill(null);

const CatalogSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <div className='w-full pt-5'>
        <div className={styles.stories}>
          {skeletonStories.map((_, key) => (
            <SkeletonWave className={'h-[300px] rounded-3xl  sm:h-[480px]'} key={key} />
          ))}
        </div>
        <div className={styles.recommendations}>
          {skeletonRecommendations.map((_, key) => (
            <SkeletonWave className={'h-[300px] rounded-3xl  sm:h-[480px]'} key={key} />
          ))}
        </div>
        <div className={styles.platesList}>
          {skeletonCatalog.map((_, idx) => (
            <SkeletonWave className={'h-[300px] rounded-3xl  sm:h-[480px]'} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogSkeleton;
