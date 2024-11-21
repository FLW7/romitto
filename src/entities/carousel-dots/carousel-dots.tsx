const CarouselDots: React.FC<{
  length: number;
  current: number;
}> = ({ length, current }) => {
  // Ширина одного элемента в процентах
  const dotWidth = 100 / length; // ширина одного элемента

  // Позиция слева для текущего элемента
  const leftPosition = current === 1 ? 0 : ((current - 1) / length) * 100; // позиция для текущего элемента

  return (
    <div className='mx-auto w-fit'>
      <div className='relative h-[3px] max-h-[3px] w-[150px] rounded-[8px] bg-primary/10'>
        <span
          className='absolute block h-[3px] rounded-[8px] bg-main !transition-all !ease-linear'
          style={{
            width: dotWidth + '%', // ширина одного элемента
            left: leftPosition + '%', // позиция для текущего элемента
          }}
        />
      </div>
    </div>
  );
};

export default CarouselDots;
