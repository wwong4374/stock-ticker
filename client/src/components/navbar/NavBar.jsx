/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <li>
        <Link to="/">Portfolio</Link>
      </li>
      {/* <li>
        <Link to="/portfolio">Portfolio</Link>
      </li> */}
      <li>
        <Link to="/graph">Graph</Link>
      </li>
    </div>
  );
};

export default NavBar;
