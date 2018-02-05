import React from 'react';
import colors from './colors-256';
import './ColorChooser.scss';

const Color = ({ color: [name, id, hex], callback }) => (
  <button
    className="color"
    onClick={() => callback(id)}
    title={name}
    style={{ background: hex }}
  />
);

export default class ColorChooser extends React.Component {
  state = { isActive: false };

  render() {
    const { label, callback } = this.props;
    const { isActive } = this.state;
    return (
      <div className="color-chooser">
        <button onClick={() => this.setState({ isActive: !isActive })}>
          {label}
        </button>
        {
          isActive &&
          <div className="colors">
            {colors.map(color =>
              <Color key={color[1]} color={color} callback={callback} />)}
          </div>
        }
      </div>
    );
  }
}
