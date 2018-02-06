import React from 'react';
import './Terminal.scss';

export default ({ text, color, bgColor, formats }) => {
  const inverted = formats.includes('Invert');
  const dimmed = formats.includes('Dim');
  const finalFgColor = inverted ? bgColor : color;
  const finalBgColor = inverted ? color : bgColor;
  const style = { color: dimmed ? `${finalFgColor}7f` : finalFgColor, background: finalBgColor };
  const className = `text ${formats.map(f => `format-${f.toLowerCase()}`).join(' ')}`;

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
        <div className="body-inner-content">
          <span className="arrow">></span>
          <span className={className} style={style} contentEditable>{text}</span>
        </div>
      </div>
    </div>
  );
}
