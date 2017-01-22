import React from 'react';
import { Link } from 'react-router';

import './Header.sass';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <ul>
          <li><Link to="/play" activeClassName="active">Play</Link></li>
          <li><Link to="/about" activeClassName="active">About</Link></li>
        </ul>
      </div>
    )
  }
}

export default Header;
