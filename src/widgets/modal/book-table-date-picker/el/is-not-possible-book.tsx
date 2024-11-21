import Typography from '@/shared/components/typography';

export const IsNotPossibleBook = () => {
  return (
    <div className={'center mt-4'}>
      <Typography variant={'p'} className={'text-center'}>
        Бронирование столиков не предусмотрено в этом ресторане
      </Typography>
    </div>
  );
};
