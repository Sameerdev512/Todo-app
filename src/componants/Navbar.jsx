import React from 'react'

const Navbar = () => {
  return (
    <div className="flex flex-row justify-evenly bg-blue-700 text-white items-center w-[100%] h-10">
      <div className="text-2xl text font-semibold cursor-pointer font-mono">Todo</div>
      <div className="nav_items">
        <ul className="flex gap-8">
          <li className="cursor-pointer hover:font-bold transition-all">
            Home
          </li>
          <li className="cursor-pointer hover:font-bold transition-all">
            About
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar
