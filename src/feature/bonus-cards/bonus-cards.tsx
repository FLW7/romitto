/* eslint-disable unicorn/consistent-function-scoping */
'use client';

import CardBronze from '@/assets/icons/bonus-bronze-card.svg';
import CardGold from '@/assets/icons/bonus-gold-card.svg';
import CardSilver from '@/assets/icons/bonus-silver-card.svg';
import Typography from '@/shared/components/typography';

const BonusCards = () => {
  // const { onOpen } = useModal();
  // const { isAuth } = useAuth();

  const cards = [
    <CardBronze key={3} width={312} height={312} />,
    <CardGold key={2} width={312} height={312} />,
    <CardSilver key={1} width={312} height={312} />,
  ];

  // const { mutateAsync, isPending } = useCreatePrimeHillData();

  // const getCardHandler = async () => {
  //   if (isAuth) {
  //     await mutateAsync().then((data) => {
  //       if (data.cardLink && data.cardLink?.length > 0) {
  //         window.open(data.cardLink, '_blank');
  //       } else {
  //         onOpen('orderReject', {
  //           title: 'Произошла ошибка',
  //           message: 'попробуйте еще раз',
  //         });
  //       }
  //     });
  //   } else {
  //     onOpen('login');
  //   }
  // };

  return (
    <div className='flex flex-col items-center justify-center px-4'>
      <Typography variant='h1' className='mb-3 max-md:text-xl'>
        Уровни бонусных карт
      </Typography>
      <Typography variant='desc' className='text-lg font-medium text-secondary'>
        1 бонус = 1 рублю
      </Typography>
      <div className='my-8 flex flex-wrap justify-center gap-5'>
        {cards.map((item) => item)}
      </div>
      {/* <Button
        className='w-[340px] max-sm:w-full'
        onClick={getCardHandler}
        disabled={isPending}
      >
        {isPending ? <Loader className='animate-spin' /> : 'Получить карту'}
      </Button> */}
    </div>
  );
};

export default BonusCards;
