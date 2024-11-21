const ContactContentItem: React.FC<{ text?: string }> = ({ text }) => {
  return (
    text && (
      <div>
        <ul className='mt-0 flex flex-col gap-[10px]'>
          <li className='flex gap-2 text-primary'>
            <article className='prose max-w-full'>
              {<div dangerouslySetInnerHTML={{ __html: text }}></div>}
            </article>
            {/* <Typography variant='desc' className='text-base font-medium leading-10'>
              {parse(text)}
            </Typography> */}
          </li>
        </ul>
      </div>
    )
  );
};

export default ContactContentItem;
