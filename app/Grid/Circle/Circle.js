import React from 'react';

let Circle = React.createClass({
  render() {
    let style = {
      backgroundColor: this.props.color,
      left: this.props.x,
      top: this.props.y,
      opacity: this.props.highlight ? 1 : 0.35,
      position: 'absolute',
      height: 100,
      width: 100,
      borderRadius: '400%'
    };
    return <div style={style}/>;
  }

});

export default Circle;
