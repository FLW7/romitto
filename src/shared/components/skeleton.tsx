import { cn } from '@/shared/lib/utils';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        `
      relative
      isolate
      overflow-hidden
      before:absolute
      before:inset-0
      before:-translate-x-full
      before:animate-[wave_3s_infinite]
      before:border-t
      before:border-primary
      before:bg-gradient-to-r
      before:from-none
      before:via-primary
      before:to-none
      `,
        className,
      )}
      {...props}
    />
  );
}

interface SkeletonProps {
  className: string;
}
export const SkeletonWave = ({ className }: SkeletonProps) => (
  <div
    className={cn(
      `
      relative
      isolate
      h-full
      w-full
      overflow-hidden
      before:absolute
      before:inset-0
      before:-translate-x-full
      before:-translate-y-full
      before:animate-[wave_2s_infinite]
      before:bg-gradient-to-tl
      before:from-none
      before:via-primary
      before:to-none
      before:blur-2xl
      `,
      className,
    )}
  >
    <div className={cn('h-full w-full bg-primary/10')} />
  </div>
);
