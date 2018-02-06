import React from 'react';
import colors from './colors-256';
import './ColorChooser.scss';

const ColorBtn = ({ color: [name, id, hex], callback, selected }) => (
  <button
    className={`color ${selected ? 'selected' : ''}`}
    onClick={() => callback(id)}
    title={name}
    style={{ background: hex }}
  />
);

export default class ColorChooser extends React.Component {
  constructor() {
    super();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  state = { isActive: false };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.state.isActive && this.ref && !this.ref.contains(event.target)) {
      this.setState({ isActive: false });
    }
  }

  render() {
    const { label, callback, color } = this.props;
    const { isActive } = this.state;
    const className = `color-chooser ${isActive ? 'active' : ''}`;
    return (
      <div className={className} ref={(el) => { this.ref = el; }}>
        <button onClick={() => this.setState({ isActive: !isActive })}>
          <span className="content">{label}</span>
          <span className="arrow">⌄</span>
        </button>
        {
          isActive &&
          <div className="colors">
            {colors.map(c => (
              <ColorBtn
                key={c[1]}
                color={c}
                callback={callback}
                selected={c[1] === color.id}
              />))}
          </div>
        }
      </div>
    );
  }
}
