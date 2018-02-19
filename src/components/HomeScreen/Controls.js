import React from 'react';
import allFormats from './formats';
import ColorChooser from './ColorChooser';
import './Controls.scss';

const themes = ['light', 'dark'];

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

const Settings = ({ terminalTheme, setTerminalTheme }) => (
  <div className="settings">
    <label>
      Terminal theme:
      <select value={terminalTheme} onChange={e => setTerminalTheme(e.target.value)}>
        {themes.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
    </label>
  </div>
);

export default class Controls extends React.Component {
  state = { settingsOpen: false };

  toggleSettings() {
    this.setState({ settingsOpen: !this.state.settingsOpen });
  }

  render() {
    const { selectedColor, selectedBgColor, setColor, setBgColor, formats, setFormat }
      = this.props;
    return (
      <div className="controls">
        <ColorChooser label="Foreground" callback={setColor} color={selectedColor} />
        <ColorChooser label="Background" callback={setBgColor} color={selectedBgColor} />
        {allFormats.map(format =>
          <FormatField key={format.name} {...{ formats, setFormat, format }} />)}
        <button
          title="Settings"
          className="toggle-settings"
          onClick={() => this.toggleSettings()}
        >
          <span role="img" aria-label="Settings">⚙️</span>
        </button>
        {this.state.settingsOpen && <Settings {...this.props} />}
      </div>
    );
  }
}
