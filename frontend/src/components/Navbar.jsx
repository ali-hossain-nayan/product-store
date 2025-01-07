import React from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <nav>
                <ul className='flex justify-evenly bg-gray-800 text-white p-4'>
                    <li className='mr-6'>
                        <Link to='/' className='hover:text-gray-300 text-4xl font-bold'>
                            Product Store
                        </Link>
                    </li>
                    <li>
                        <Link to='/create' className='flex items-center font-sm hover:text-gray-300'>
                            Create <FaCartPlus className='ml-1' />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
