import Image from 'next/image';

import Image1 from './images/image_1.png';
import Image2 from './images/image_2.png';
import Image3 from './images/image_3.png';
import Image4 from './images/image_4.png';
import Image5 from './images/image_5.png';
import Image6 from './images/image_6.png';

import Typography from '@/shared/components/typography';

const AboutRestaurant = () => {
  return (
    <div>
      <div>
        <div className='flex flex-col gap-3'>
          <Typography
            variant='h1'
            className='text-nowrap !text-xl !font-semibold !text-primary max-md:!text-lg'
          >
            О нас
          </Typography>
          <Typography
            variant='desc'
            className='max-w-[1030px] !text-xl !font-normal !text-primary max-md:!text-lg'
          >
            Шаверно» — городская сеть шаверм, в которых в лучшем виде сочетаются быстрая
            скорость обслуживания, доступные цены и высокое качество блюд.
          </Typography>
        </div>
        <div className='mt-8 grid grid-cols-2 gap-3 max-lg:grid-cols-1'>
          <div className='grid grid-cols-1 gap-3'>
            <div>
              <Image src={Image1} alt='' className='w-full' />
            </div>
            <div className='grid grid-cols-2 justify-between gap-3'>
              <Image src={Image2} alt='' className='w-full' />
              <Image src={Image3} alt='' className='w-full' />
            </div>
          </div>
          <div className='grid grid-cols-1 gap-3'>
            <div className='grid grid-cols-2 justify-between gap-3 max-lg:order-2'>
              <Image src={Image4} alt='' className='w-full' />
              <Image src={Image5} alt='' className='w-full' />
            </div>
            <div className='max-lg:order-1'>
              <Image src={Image6} alt='' className='w-full' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutRestaurant;
