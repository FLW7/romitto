import Typography from '@/shared/components/typography';

const Contacts = () => {
  return (
    <div className='border-primary/10 max-lg:border-t max-lg:py-5'>
      <Typography variant='desc' className='mb-2 !text-base font-semibold'>
        ООО “Шаверно франчайзинг”
      </Typography>
      <Typography variant='desc' className='!text-base font-semibold text-secondary'>
        ОГРН 1237800129819
        <br />
        ИНН 7814830130197341,
        <br /> г. Санкт-Петербург,
        <br /> Коломяжский пр-кт, д. 33 литера А,
        <br /> помещ. 40-н офис 501
      </Typography>
    </div>
  );
};

export default Contacts;
