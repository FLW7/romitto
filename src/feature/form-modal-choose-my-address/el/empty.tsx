import PlacemarkIcon from '@/assets/icons/placemark.svg';
import Typography from '@/shared/components/typography';

export const Empty = () => {
  return (
    <div className={'!mt-28 flex flex-col justify-center'}>
      <div className={'center mb-4'}>
        <PlacemarkIcon className={' h-12 w-8'} />
      </div>

      <Typography variant={'p'} className={'mb-6 text-center font-semibold'}>
        У вас пока нет сохраненных адресов
      </Typography>
    </div>
  );
};
