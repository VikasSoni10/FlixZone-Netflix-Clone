import React from 'react'
import logo from '../../logo.png';
import {Link} from 'react-router-dom';
import {FiSearch} from 'react-icons/fi';

const Header = () => {

    return (
        <nav className='header'>
            <img src={logo} alt="logo" />

            <div>
                <Link to='/Movies' >TV Shows</Link>
                <Link to='/Movies' >Movies</Link>
                <Link to='/Movies' >Recently Added</Link>
                <Link to='/Movies' >My List</Link>
            </div>
            <FiSearch />

        </nav>
    )
}

export default Header