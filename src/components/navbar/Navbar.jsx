import React from 'react';

const Navbar = () => {
  // Get current date and time
  const currentDate = new Date();

  // Format date and time
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedDateTime = currentDate.toLocaleString('en-US', options);

  return (
    <div className='flex justify-end w-full px-[32px] py-[28px]'>
      <span className='text-[#737791] font-[500]'>
        {formattedDateTime}
      </span>
    </div>
  );
};

export default Navbar;
