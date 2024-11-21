import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/select';
import Typography from '@/shared/components/typography';

interface IMobileSelectProps {
  title: string;
  items: any[];
  onChange: (value: any) => void;
  defaultValue?: string;
}

const MobileSelect: React.FC<IMobileSelectProps> = ({
  title,
  items,
  onChange,
  defaultValue = '1',
}) => {
  return (
    <Select
      onValueChange={(val) => {
        onChange(val);
      }}
      defaultValue={defaultValue}
    >
      <div className='w-full border-b-[3px] border-t-[3px] border-grey bg-white px-4 py-3'>
        {title && (
          <Typography variant='desc' className='text-xs  font-medium text-main'>
            {title}
          </Typography>
        )}
        <SelectTrigger className='rounded-none border-none p-0 text-start text-base font-semibold text-primary outline-none'>
          <SelectValue className='outline-none' placeholder='Выберите ресторан' />
        </SelectTrigger>
      </div>
      <SelectContent className='rounded-none border-0 bg-white' sideOffset={10}>
        <SelectGroup>
          {items?.map((item, key) => (
            <SelectItem
              key={key}
              className='text-base text-primary *:max-sm:max-w-[350px] '
              value={item.id.toString()}
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default MobileSelect;
