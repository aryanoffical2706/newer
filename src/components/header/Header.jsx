import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

function Header() {
  return (
    <div>
      <nav>
        <h1 className='hea' >Hotel Top view</h1>
        <main className='mai'>
          <HashLink smooth to="/home">Home</HashLink>
          <Link to="/booking">Booking</Link>
          <HashLink smooth to="/home#about">Pricing</HashLink>
          <HashLink smooth to="/home#brand">Branch</HashLink>
          <Link to="/service">Services</Link>
        </main>
      </nav>
    </div>
  );
}

export default Header;
