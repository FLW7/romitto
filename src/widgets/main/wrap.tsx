import Typography from '@/shared/components/typography';
import { cn } from '@/shared/lib/utils';
interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
  classNameWrap?: string;
}
export const Wrap = ({ children, title, className, classNameWrap }: Props) => {
  return (
    <section className={classNameWrap}>
      <Typography variant='h2' className={cn(className, 'mb-5 sm:px-0')}>
        {title}
      </Typography>
      {children}
    </section>
  );
};
