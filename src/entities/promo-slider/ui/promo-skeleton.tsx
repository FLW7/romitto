import React from 'react';

import styles from './styles.module.css';

import { Skeleton } from '@/shared/components/skeleton';

const PromoSkeleton = () => {
  return (
    <div className={styles.skeleton_wrapper}>
      <div className={styles.center_slide}>
        <div className='h-[400px] w-[1480px]'>
          <Skeleton className={styles.center_slide_skeleton} />
        </div>
      </div>
      <div className={styles.right_slide}>
        <Skeleton className={styles.left_right_slide_skeleton} />
      </div>
      <div className={styles.left_slide}>
        <Skeleton className={styles.left_right_slide_skeleton} />
      </div>
    </div>
  );
};

export default PromoSkeleton;
