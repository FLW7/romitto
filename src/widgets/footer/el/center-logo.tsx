import LogoIcon from '@/assets/icons/logo.svg';
export const CenterLogo = () => {
  return (
    <div className={'flex flex-col'}>
      <LogoIcon className='h-logoFooterMobile w-logoFooterMobile lg:h-logoFooter lg:w-logoFooter' />
    </div>
  );
};
