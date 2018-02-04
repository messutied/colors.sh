import React from 'react';
import './Terminal.scss';

export default ({ text, color, bgColor, formats }) => {
  const invertedStyle = formats.includes('Invert') ?
    { color: bgColor, background: color } : null;

  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="btns">
          <div />
          <div />
          <div />
        </div>
        colors.sh -- preview
      </div>
      <div className="terminal-body">
        <span className="arrow">></span>
        <span
          className={`text ${formats.map(f => `format-${f.toLowerCase()}`).join(' ')}`}
          style={{ color, background: bgColor, ...invertedStyle }}
        >
          {text}
        </span>
      </div>
    </div>
  );
}
