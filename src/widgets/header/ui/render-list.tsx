import { type FC } from 'react';

import Link from 'next/link';

interface Items {
  id: number;
  text: string;
  link: string;
}

interface RenderListProps {
  items: Items[];
}

const RenderList: FC<RenderListProps> = ({ items }) => {
  return items.map(({ id, text, link }) => (
    <div key={id} className='hover:text-black'>
      <Link href={link}>{text}</Link>
    </div>
  ));
};

export default RenderList;
