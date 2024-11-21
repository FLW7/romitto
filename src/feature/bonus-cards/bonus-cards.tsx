/* eslint-disable unicorn/consistent-function-scoping */
'use client';

import CardBronze from '@/assets/icons/bonus-bronze-card.svg';
import CardGold from '@/assets/icons/bonus-gold-card.svg';
import CardSilver from '@/assets/icons/bonus-silver-card.svg';
import { Button } from '@/shared/components/button';
import Typography from '@/shared/components/typography';
import { useAuth } from '@/shared/state/auth';
import { useModal } from '@/shared/state/modal';

const BonusCards = () => {
  const { onOpen } = useModal();
  const { isAuth } = useAuth();

  const cards = [
    <CardBronze key={3} width={312} height={312} />,
    <CardGold key={2} width={312} height={312} />,
    <CardSilver key={1} width={312} height={312} />,
  ];

  const getCardHandler = async () => {
    onOpen('login', { isGetCard: true });
  };

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
      {!isAuth && (
        <Button className='w-[340px] max-sm:w-full' onClick={getCardHandler}>
          Получить карту
        </Button>
      )}
    </div>
  );
};

export default BonusCards;
