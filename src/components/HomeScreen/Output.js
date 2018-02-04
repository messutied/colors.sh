import React from 'react';
import './Output.scss';

const Line = ({ children, type = 'default' }) =>
  <div className={`line line-${type}`}>{children}</div>;

export default ({ lines }) => (
  <div className="output">
    <Line type="comment"># How to implement it</Line>
    {lines.map((l, i) => <Line key={i}>{l}</Line>)}
  </div>
);
