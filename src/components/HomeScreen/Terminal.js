import React from 'react';
import './Terminal.scss';

export default ({ text, color }) => (
  <div className="terminal">
    <div className="terminal-header">
      <div className="btns">
        <div />
        <div />
        <div />
      </div>
      Colors.sh -- bash
    </div>
    <div className="terminal-body">
      <span className="text" style={{ color }}>{text}</span>
    </div>
  </div>
);
