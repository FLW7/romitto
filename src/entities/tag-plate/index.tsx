/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable unicorn/no-nested-ternary */
import Image from 'next/image';

import { impact } from '../../../public/font/font';

import styles from './styles.module.css';

import TooltipCustom from '@/shared/components/tooltip/tooltip-custom';
import Typography from '@/shared/components/typography';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { priceFormatter } from '@/shared/lib/price';
import { cn } from '@/shared/lib/utils';
import { type ITag } from '@/shared/type/product';

const TagPlate: React.FC<{
  tag?: ITag;
  platePrice: number;
  indx: number;
  plateId: number;
}> = ({ tag, platePrice, indx, plateId }) => {
  const isMobile = useMediaQuery('(max-width:768px)');

  const dynamicContainerStyles = {
    color: tag?.title_color,
    bottom: isMobile
      ? `calc(${Number(tag?.posY) * 100}% - ${Number(tag?.heightAdaptive ?? 0) * Number(tag?.posY)}px)`
      : `calc(${Number(tag?.posY) * 100}% - ${Number(tag?.height ?? 0) * Number(tag?.posY)}px)`,
    left: isMobile
      ? `calc(${Number(tag?.posX) * 100}% - ${Number(tag?.widthAdaptive ?? 0) * Number(tag?.posX)}px)`
      : `calc(${Number(tag?.posX) * 100}% - ${Number(tag?.width ?? 0) * Number(tag?.posX)}px)`,
    height: isMobile
      ? `${Number(tag?.heightAdaptive || 36)}px`
      : `${Number(tag?.height || 36)}px`,
    maxHeight: isMobile
      ? `${Number(tag?.heightAdaptive || 36)}px`
      : `${Number(tag?.height || 36)}px`,
    width: isMobile
      ? `${Number(tag?.widthAdaptive || 36)}px`
      : `${Number(tag?.width || 36)}px`,
    maxWidth: isMobile
      ? `${Number(tag?.widthAdaptive || 36)}px`
      : `${Number(tag?.width || 36)}px`,
  };

  const dynamicImageStyles = {
    height: isMobile
      ? `${Number(tag?.heightAdaptive || 36)}px`
      : `${Number(tag?.height || 36)}px`,
    maxHeight: isMobile
      ? `${Number(tag?.heightAdaptive || 36)}px`
      : `${Number(tag?.height || 36)}px`,
    width: isMobile
      ? `${Number(tag?.widthAdaptive || 36)}px`
      : `${Number(tag?.width || 36)}px`,
    maxWidth: isMobile
      ? `${Number(tag?.widthAdaptive || 36)}px`
      : `${Number(tag?.width || 36)}px`,
  };

  const staticContainerStyles = {
    width: isMobile ? '36px' : '50px',
    height: isMobile ? '36px' : '50px',
  };
  const staticImageStyles = {
    height: isMobile ? '36px' : '50px',
    maxHeight: isMobile ? '36px' : '50px',
    width: isMobile ? '36px' : '50px',
    maxWidth: isMobile ? '36px' : '50px',
  };

  console.log(indx);

  return tag ? (
    <div
      className={cn(
        'shadow-tagShadow flex h-fit min-w-max items-center !text-sm font-semibold',
        Number(tag.tagType) === 0
          ? `relative transition-all first:!translate-x-0 group-hover/tags:!translate-x-0 ${indx > 1 && '!translate-x-[-100%]'} translate-x-[-50%]`
          : 'absolute',
      )}
      style={Number(tag.tagType) === 0 ? staticContainerStyles : dynamicContainerStyles}
    >
      <TooltipCustom
        id={tag.id + plateId}
        offset={7}
        events={['hover']}
        place='bottom-end'
        delayShow={10}
      />
      {tag?.url && (
        <div className='relative'>
          <Image
            data-tooltip-id={tag.id + plateId}
            data-tooltip-content={tag?.title}
            src={tag.url}
            width={512}
            quality={100}
            height={512}
            alt={tag?.title ?? ''}
            className='object-contain'
            style={Number(tag.tagType) === 0 ? staticImageStyles : dynamicImageStyles}
          />
          {tag.title === 'sale' && platePrice && (
            <div className='absolute top-0 z-[0] flex h-full w-full flex-col justify-center gap-y-1 px-3 max-md:gap-y-[2px] max-md:px-[10px]'>
              <Typography
                variant='desc'
                className={cn(
                  impact.className,
                  styles.lineThrough,
                  '!w-fit whitespace-nowrap !text-lg !leading-[100%] !text-secondary md:!leading-[100%]',
                )}
              >
                {priceFormatter(platePrice)}
              </Typography>
              <Typography
                variant='desc'
                className={cn(
                  impact.className,
                  priceFormatter(Number(platePrice) / 2).length >= 6
                    ? '!text-[26px] md:!text-3xl'
                    : '!text-3xl md:!text-4xl',
                  'whitespace-nowrap !leading-[100%] text-white',
                )}
              >
                {priceFormatter(Number(platePrice) / 2)}
              </Typography>
            </div>
          )}
        </div>
      )}
    </div>
  ) : null;
};

export default TagPlate;
