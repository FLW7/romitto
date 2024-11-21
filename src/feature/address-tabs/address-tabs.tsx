import TabTrigger from '@/entities/tab-trigger/tab-trigger';
import { TabsList } from '@/shared/components/tabs';

const AddressTabs: React.FC<{ data: any }> = ({ data }) => {
  return (
    <TabsList className='flex h-fit w-[480px] flex-col items-start justify-start overflow-hidden rounded-xl border-2 border-primary/10 bg-none p-0'>
      {data?.map((item: any, key: number) => (
        <TabTrigger
          className='max-h-[62px] justify-start whitespace-normal !rounded-none text-start'
          key={key}
          value={key.toString()}
        >
          {item.name}
        </TabTrigger>
      ))}
    </TabsList>
  );
};

export default AddressTabs;
