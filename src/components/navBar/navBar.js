import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button,Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem,
          NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import './navBar.scss';

let navBar = (props) => {
  

  return(
    <Container fluid className='navBarBox'>
       <Link to='/'>
        <Button size='sm' color='info' className='navbarButton'>
          cyprtoDashboard
        </Button>
      </Link>
      <Link to='/blockchainDashBoard'>
        <Button size='sm' color='info'>
          blockchain
        </Button>
      </Link>
      <Link to='/icos'>
        <Button size='sm' color='info'>
          ICOS
        </Button>
      </Link>
      <Link to='/news'>
        <Button size='sm' color='info'>
          News
        </Button>
      </Link>
    </Container>
  )
}

export default navBar;