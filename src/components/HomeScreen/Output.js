import React from 'react';
import './Output.scss';

const FormatDeclaration = ({ format: { name, code } }) => (
  <Line>
    {`F_${name.toUpperCase()}="\\033[${code}m"`}
  </Line>
);

const Line = ({ children, type = 'default' }) =>
  <div className={`line line-${type}`}>{children}</div>;

export default ({ formats, selectedColor, text }) => {
  const formatsStr = formats.map(f => `\${F_${f.name.toUpperCase()}}`).join('');
  const colorStr = selectedColor.id ? `\${C_${selectedColor.name.toUpperCase()}}` : '';
  return (
    <div className="output">
      <Line type="comment"># How to implement it</Line>
      <Line>{'NO_FORMAT="\\033[0m"'}</Line>
      {formats.map(format => <FormatDeclaration key={format.name} format={format} />)}
      {
        selectedColor.id &&
          <Line>
            {`C_${selectedColor.name.toUpperCase()}="\\033[38;5;${selectedColor.id}m"`}
          </Line>
      }
      <Line>{`echo -e "${formatsStr}${colorStr}${text}\${NO_FORMAT}"`}</Line>
    </div>
  );
};
