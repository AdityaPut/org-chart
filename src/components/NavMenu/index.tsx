'use client';

const NavMenu = () => {
  return (
    <nav className='bg-white border-gray-200 dark:bg-gray-900 shadow-md fixed w-[100vw] z-10'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <a href='#' className='flex items-center space-x-3 rtl:space-x-reverse'>
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
            structureOrgChart
          </span>
        </a>
      </div>
    </nav>
  );
};

export default NavMenu;