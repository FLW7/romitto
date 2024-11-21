import * as React from 'react';
import { useState, useEffect } from 'react';

import { cn } from '@/shared/lib/utils';
interface Props {
  duration: number;
  progress: number;
  className?: string;
  activeIndex: number;
  index: number;
  onFinish?: () => void;
}
export function ProgressBar({
  duration,
  progress,
  className,
  activeIndex,
  index,
  onFinish,
}: Props) {
  const [currentProgress, setCurrentProgress] = useState(0);
  const isActive = activeIndex === index;

  useEffect(() => {
    if (isActive) {
      setCurrentProgress(0);
      let timer: string | number | NodeJS.Timeout | undefined;

      if (progress < duration) {
        timer = setInterval(() => {
          setCurrentProgress((prev) => prev + 0.5);
        }, 500);
      }

      return () => {
        clearInterval(timer);
      };
    }
  }, [progress, duration, isActive]);

  const progressPercentage = (currentProgress / duration) * 140;

  useEffect(() => {
    if (currentProgress >= duration) {
      onFinish && onFinish();
    }
  }, [currentProgress, duration]);

  useEffect(() => {
    if (activeIndex > index) {
      setCurrentProgress(duration);
    } else {
      setCurrentProgress(0);
    }
  }, [activeIndex]);

  return (
    <div className={cn(className, 'my-2  flex h-[3px] rounded-full bg-black/15')}>
      <div
        className='rounded-full bg-white transition-all duration-700 ease-in'
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
}
