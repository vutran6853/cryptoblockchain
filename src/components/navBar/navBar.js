import React, { Component } from 'react';
import { Link } from 'react-router-dom';

let navBar = (props) => {
  return(
    <div>
       <Link to='/'>
        <button>
          cyprtoDashboard
        </button>
      </Link>
      <Link to='/blockchainDashBoard'>
        <button>
          blockchain
        </button>
      </Link>
    </div>
  )
}

export default navBar;