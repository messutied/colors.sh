/* eslint no-octal-escape: 0 */

import React from 'react';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';
import Store from './store';
import Terminal from './Terminal';
import './HomeScreen.scss';
import Output from './Output';
import Controls from './Controls';

const setupUrlPersistedStore = () => {
  const settingsStr = window.location.hash.replace('#settings=', '');
  let initialState;
  if (settingsStr.length > 0) {
    try {
      initialState = JSON.parse(decodeURIComponent(settingsStr));
    } catch (e) {
      console.warn('Failed to parse state');
    }
  }

  const store = new Store(initialState);
  let firstAutorunCalled = false;

  autorun(() => {
    const state = encodeURIComponent(JSON.stringify(store.toJSON()));
    if (firstAutorunCalled) {
      window.location.hash = `settings=${state}`;
    }
    firstAutorunCalled = true;
  });

  return store;
};

const store = setupUrlPersistedStore();

const HomeScreen = () => {
  const { selectedColor, selectedBgColor, text } = store;

  return (
    <div className="home-screen">
      <div className="help">
        Colors.sh helps you add colors and formatting to your bash scripts. <br/>
        Pick some options to format the terminal's preview 👇
      </div>
      <Controls {...store} />
      <Terminal
        text={text}
        color={selectedColor.hex}
        bgColor={selectedBgColor.hex}
        formats={store.formats.map(f => f.name)}
        theme={store.terminalTheme}
      />
      <Output lines={store.outputLines} />
    </div>
  );
};

export default observer(HomeScreen);
