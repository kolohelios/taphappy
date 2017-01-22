import React from 'react';
import Hammer from 'react-hammerjs';
import ClassNames from 'classnames';

import './Nyan.sass';

let Nyan = React.createClass({
  getInitialState() {
    return {
      x: this.props.x,
      y: this.props.y,
      height: 100,
      width: 100
    };
  },
  render() {
    var style = {
      left: this.props.x,
      top: this.props.y,
      height: this.state.height,
      width: this.state.width,
      backgroundImage: 'url(../assets/nyan-cat.svg)'
    };
    let classes = ClassNames(
      'nyan',
      { animate: this.props.active },
      { victory: this.props.victory }
    );
    return (
      <div className={classes} style={style}></div>
    );
  }

});

export default Nyan;
