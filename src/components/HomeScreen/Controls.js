import React from 'react';
import colors from './colors-256';
import allFormats from './formats';
import ColorChooser from './ColorChooser';

const FormatField = ({ formats, setFormat, format }) => (
  <label>
    <input
      type="checkbox"
      onChange={evt => setFormat(format.name, evt.target.checked)}
      checked={!!formats.find(f => f.name === format.name)}
    />
    {format.name}
  </label>
);

export default ({ selectedColor, selectedBgColor, setColor, setBgColor, formats, setFormat }) => (
  <div className="controls">
    <ColorChooser label="Foreground" callback={setColor} />
    <ColorChooser label="Background" callback={setBgColor} />
    {allFormats.map(format =>
      <FormatField key={format.name} {...{ formats, setFormat, format }} />)}
  </div>
);
