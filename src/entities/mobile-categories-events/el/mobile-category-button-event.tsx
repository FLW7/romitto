import Typography from '@/shared/components/typography';

const MobileCategoryButtonEvent: React.FC<{
  text: string;
  index: number;
  activeIndex: number;
  onClick: (index: number) => void;
}> = ({ text, index, activeIndex, onClick }) => {
  return (
    <div
      className={`ml-1 h-9 cursor-pointer select-none rounded-full border border-main px-5 py-2  ${index === activeIndex && ' border-none bg-main'}`}
      onClick={() => {
        onClick(index);
      }}
    >
      <Typography
        variant='desc'
        // eslint-disable-next-line prettier/prettier
        className={`flex items-center text-sm font-semibold leading-[19.6px] ${index === activeIndex ? '!text-white' : '!text-main'}`}
      >
        {text}
      </Typography>
    </div>
  );
};

export default MobileCategoryButtonEvent;
