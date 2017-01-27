import React from 'react';
import Sound from 'react-sound';
import _ from 'lodash';

import Circle from './Circle/Circle';
import Panel from './Panel/Panel';

const headerMargin = 50;
const sideMargin = 100;
let grids = 10;

let colors = [ '#432169', '#FD8D2C', '#E6EB3D', '#1FB229', '#4790E2', '#721D89' ];
let randomColor = function() {
  return colors[_.random(0, colors.length - 1)];
};
let xLocation = function() {
  return _.random(0, window.innerWidth - sideMargin);
};
let yLocation = function() {
  return _.random(headerMargin, window.innerHeight - headerMargin);
};
let circleData = (function() {
  let circles = [];
  for (let i = 0; i < grids; i++) {
    circles.push({ x: xLocation(), y: yLocation(), color: randomColor() });
  }
  return circles;
})();

let width = 100;
let height = 100;

let Grid = React.createClass({
  componentDidMount() {
    soundManager.setup({ debugMode: false });
    this.interval = setInterval(this.increment, 1000);
  },
  stopPlaying() {
    this.state.playSound = false;
  },
  getInitialState() {
    return {
      highlight: [],
      coins: 0,
      charInactive: false,
      playSound: false,
      timer: 0
    }
  },
  increment() {
    this.setState({ timer: this.state.timer + 1 });
  },
  componentWillUnmount() {
    clearInterval(this.interval);
  },
  componentWillReceiveProps() {
    let self = this;
    circleData.forEach(function(rect, i) {
      if (rect.x < self.props.charX && rect.x + width > self.props.charX &&
        rect.y < self.props.charY && rect.y + height > self.props.charY && !self.state.highlight[i]) {
          self.state.highlight[i] = true;
          if (!self.state.playSound) {
            self.state.playSound = true;
          }
          self.state.coins++;
      }
    });
    if (this.state.coins === grids && !this.state.charInactive) {
      this.state.charInactive = true;
      clearInterval(this.interval);
      this.props.setCharInactive();
    }
  },
  render() {
    let self = this;

    let circles = circleData.map(function(circle, i) {
      return <Circle key={i} x={circle.x} y={circle.y} color={circle.color} highlight={self.state.highlight[i]} />
    });
    return (
      <div className="grid">
        <Panel coins={this.state.coins} timer={this.state.timer} totalCoins={grids}/>
        <Sound url="../assets/coin-drop-4.mp3" playStatus={this.state.playSound ? Sound.status.PLAYING : Sound.status.STOPPED} onFinishedPlaying={this.stopPlaying}/>
        {circles}
      </div>
    );
  }

});

export default Grid;
