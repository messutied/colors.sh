/* eslint no-octal-escape: 0 */

import React from 'react';
import { observer } from 'mobx-react';
import Store from './store';
import colors from './colors-256';
import formats from './formats';
import Terminal from './Terminal';
import './HomeScreen.scss';
import Output from './Output';

const store = new Store();

const FormatField = ({ format }) => (
  <label>
    <input
      type="checkbox"
      onChange={evt => store.setformat(format.name, evt.target.checked)}
      checked={!!store.formats.find(f => f.name === format.name)}
    />
    {format.name}
  </label>
);

const HomeScreen = () => {
  const { selectedColor, text } = store;

  return (
    <div className="home-screen">
      <select value={selectedColor.id} onChange={evt => store.setColor(evt.target.value)}>
        {colors.map(([name, id]) => <option key={id} value={id}>{name}</option>)}
      </select>
      {formats.map(format => <FormatField key={format.name} format={format} />)}
      <Terminal text={text} color={selectedColor.hex} />
      <Output {...store} />
    </div>
  );
};

export default observer(HomeScreen);
