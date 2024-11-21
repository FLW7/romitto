/* eslint-disable unicorn/prefer-at */
import DeliveryCard from '@/entities/delivery-card';
import useMediaQuery from '@/shared/hooks/use-media-query';

const DeliveryCardsList: React.FC<{
  data: Array<{ title: string; text: string; subtext: string }>;
}> = ({ data }) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');

  return (
    data && (
      <>
        <div className='mt-9 flex  gap-5 max-lg:grid max-lg:grid-cols-2'>
          {data?.map((item, key) => {
            return (
              item?.title &&
              item?.text &&
              (key !== data?.length - 1 || data?.length % 2 === 0 || !isMobile) && (
                <DeliveryCard
                  key={key}
                  title={item?.title}
                  desc={item?.text}
                  additionalText={item?.subtext}
                />
              )
            );
          })}
        </div>
        {data?.length % 2 !== 0 &&
          isMobile &&
          data?.[data?.length - 1]?.title &&
          data?.[data?.length - 1]?.text && (
            <div className='mt-5'>
              <DeliveryCard
                title={data?.[data?.length - 1]?.title}
                desc={data?.[data?.length - 1]?.text}
                additionalText={data?.[data?.length - 1]?.subtext}
              />
            </div>
          )}
      </>
    )
  );
};

export default DeliveryCardsList;
