import React from 'react';
import allFormats from './formats';
import ColorChooser from './ColorChooser';
import './Controls.scss';

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
    <ColorChooser label="Foreground" callback={setColor} color={selectedColor} />
    <ColorChooser label="Background" callback={setBgColor} color={selectedBgColor} />
    {allFormats.map(format =>
      <FormatField key={format.name} {...{ formats, setFormat, format }} />)}
  </div>
);
