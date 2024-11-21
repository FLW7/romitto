'use client';

import styles from './styles.module.css';

import { Skeleton } from '@/shared/components/skeleton';

const skeletonCatalog = Array.from({ length: 12 }).fill(null);
const skeletonStories = Array.from({ length: 3 }).fill(null);
const skeletonRecommendations = Array.from({ length: 1 }).fill(null);

const CatalogSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <Skeleton className={styles.sidebar} />
      <div className='w-full pt-5'>
        <div className={styles.stories}>
          {skeletonStories.map((_, key) => (
            <Skeleton key={key} className={styles.storyItem}></Skeleton>
          ))}
        </div>
        <div className={styles.recommendations}>
          {skeletonRecommendations.map((_, key) => (
            <Skeleton key={key} className={styles.recommendationItem}></Skeleton>
          ))}
        </div>
        <div className={styles.platesList}>
          {skeletonCatalog.map((_, idx) => (
            <Skeleton key={idx} className={styles.plate} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogSkeleton;
