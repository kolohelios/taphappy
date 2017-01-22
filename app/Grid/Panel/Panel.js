import React from 'react';

import './Panel.sass';

class Panel extends React.Component {
  render() {
    return (
      <ul className="panel">
        <li><h1>Coins: {this.props.coins} / {this.props.totalCoins}</h1></li>
        <li><h1>Timer: {this.props.timer}</h1></li>
      </ul>
    )
  }
}

export default Panel;
