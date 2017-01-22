import React from 'react';
import Hammer from 'react-hammerjs';
import Sound from 'react-sound';

import Nyan from './Nyan/Nyan';
import Grid from './Grid/Grid';

let Play = React.createClass({
  componentDidMount() {
    soundManager.setup({ debugMode: false });
  },
  getInitialState() {
    return {
      x: 0,
      y: 0,
      height: 60,
      width: 60,
      orientation: this.setOrientation(),
      active: true,
      victory: false,
      canMove: false
    };
  },
  handlePan(e) {
    if (this.state.canMove) {
      this.setState({ x: this.state.startingX + e.deltaX, y: this.state.startingY + e.deltaY });
    }
  },
  handlePanStart(e) {
    let validLocation = this.validLocation();
    if (validLocation.x < e.center.x && validLocation.x + 100 > e.center.x &&
      validLocation.y < e.center.y && validLocation.y + 100 > e.center.y) {
        this.setState({ startingX: this.state.x, startingY: this.state.y, canMove: true });
      }
  },
  handlePanEnd() {
    this.state.canMove = false;
  },
  setOrientation() {
    return window.orientation === 0 || window.orientation === 180 ? 'portrait' : 'landscape'
  },
  changeWindowOrientation() {
    this.setState({ orientation: this.setOrientation() });
  },
  validLocation() {
    let x = Math.min(this.state.x, window.innerWidth - 50);
    x = Math.max(x, 0);
    let y = Math.min(this.state.y, window.innerHeight);
    y = Math.max(y + 50, 50);
    return { x: x, y: y };
  },
  setCharInactive() {
    this.setState({
       active: false,
       victory: true
     });
  },
  render() {
    window.addEventListener('orientationchange', this.changeWindowOrientation);
    let validLocation = this.validLocation();
    return(
      <Hammer direction="DIRECTION_ALL" onPan={this.handlePan} onPanStart={this.handlePanStart} onPanEnd={this.handlePanEnd} onDoubleTap={this.handleDoubleTap}>
        <div>
          <Sound url="../assets/unknown_artist-nyan_cat.mp3" playStatus={Sound.status.PLAYING} volume={10} />
          <Grid charX={validLocation.x} charY={validLocation.y} setCharInactive={this.setCharInactive}/>
          <Nyan x={validLocation.x} y={validLocation.y} height={this.state.height} width={this.state.width} active={this.state.active} victory={this.state.victory}/>
        </div>
      </Hammer>
    );
  }

});

export default Play;
