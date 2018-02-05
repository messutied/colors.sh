/* eslint no-octal-escape: 0 */

import React from 'react';
import { observer } from 'mobx-react';
import Store from './store';
import Terminal from './Terminal';
import './HomeScreen.scss';
import Output from './Output';
import Controls from './Controls';

const store = new Store();

const HomeScreen = () => {
  const { selectedColor, selectedBgColor, text } = store;

  return (
    <div className="home-screen">
      <Controls {...store} />
      <Terminal
        text={text}
        color={selectedColor.hex}
        bgColor={selectedBgColor.hex}
        formats={store.formats.map(f => f.name)}
      />
      <Output lines={store.outputLines} />
    </div>
  );
};

export default observer(HomeScreen);
