import Typography from '@/shared/components/typography';
interface StrokeProps {
  title?: string;
  value?: string | number;
}
export const Stroke = ({ title, value }: StrokeProps) => {
  return (
    <div className={'grid grid-cols-2 items-center '}>
      <Typography variant={'p2'} className={'text-secondary'}>
        {title}
      </Typography>
      <Typography variant={'p2'} className={'text-end'}>
        {value}
      </Typography>
    </div>
  );
};
