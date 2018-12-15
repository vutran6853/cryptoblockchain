import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem,
          NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import './navBar.scss';

let navBar = (props) => {
  

  return(
    <div className='navBarBox'>
       <Link to='/'>
        <Button color='info' className='navbarButton'>
          cyprtoDashboard
        </Button>
      </Link>
      <Link to='/blockchainDashBoard'>
        <Button color='info'>
          blockchain
        </Button>
      </Link>
      <Link to='/icos'>
        <Button color='info'>
          ICOS
        </Button>
      </Link>
      <Link to='/news'>
        <Button color='info'>
          News
        </Button>
      </Link>
    </div>
  )
}

export default navBar;