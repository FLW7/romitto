import Image from 'next/image';
import Link from 'next/link';

import JhoneeFooter from '@/assets/icons/jhonee-footer.svg';
import Apple from '@/assets/images/footer/apple.png';
import Google from '@/assets/images/footer/google.png';

const BrandAndStores = () => {
  return (
    <div className='flex flex-col items-center justify-around'>
      <Link href={'/'}>
        <JhoneeFooter width={147} height={122} />
      </Link>
      <div className='mt-4 flex gap-2'>
        <div>
          <Image src={Google} alt='google' width={123} height={35} />
        </div>
        <div>
          <Image src={Apple} alt='apple' width={123} height={35} />
        </div>
      </div>
    </div>
  );
};

export default BrandAndStores;
