/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="navBar">
      <li className="navBarOption">
        <Link to="/">Portfolio</Link>
      </li>
      <li className="navBarOption">
        <Link to="/research">Research</Link>
      </li>
      <li className="navBarOption">
        <Link to="/graph">Graph</Link>
      </li>
    </div>
  );
};

export default NavBar;
