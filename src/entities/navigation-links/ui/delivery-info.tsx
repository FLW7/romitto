import Typography from '@/shared/components/typography';

const DeliveryInfo = () => {
  return (
    <div className='flex h-[200px] flex-col'>
      <div className='font-semibold'>Телефон доставки</div>
      <Typography variant={'p'} className='mb-6 text-secondary'>
        8 (999) 999-99-99
      </Typography>

      <div className='font-semibold'>Принимаем заказы</div>
      <Typography variant={'p'} className='text-secondary'>
        с 11:00 до 23:30
      </Typography>
    </div>
  );
};

export default DeliveryInfo;
