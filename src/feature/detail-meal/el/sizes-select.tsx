import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/select';
import { type Tab } from '@/shared/components/tabs-animate';

interface ISizesSelect {
  options: Tab[];
  active: Tab;
  setActive: (value: any) => void;
}

const SizesSelect: React.FC<ISizesSelect> = ({ options, active, setActive }) => {
  return (
    <Select
      value={active.value}
      onValueChange={(val) => {
        setActive(options[Number(val)]);
      }}
    >
      <SelectTrigger className='relative h-[34px] w-full rounded-full border border-primary/10 bg-counterBg px-6 py-3 text-primary'>
        <SelectValue placeholder='Выберите размер' />
      </SelectTrigger>
      <SelectContent
        sideOffset={0}
        className='max-w-full rounded-3xl border-[2px] border-primary/10 bg-bgTetriary'
      >
        {options?.map((item, key) => (
          <SelectItem key={key} value={item.value} className='text-primary'>
            {item.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SizesSelect;