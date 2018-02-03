/* eslint no-octal-escape: 0 */

import React from 'react';
import { observer } from 'mobx-react';
import Store from './store';
import colors from './colors-256';
import formats from './formats';

const store = new Store();

const HomeScreen = () => {
  const formatsStr = store.formats.map(f => `\${F_${f.name.toUpperCase()}}`).join('');
  console.log(store.formats);
  const { selectedColor, text } = store;
  return (
    <div className="home-screen">
      <select value={selectedColor.id} onChange={evt => store.setColor(evt.target.value)}>
        {colors.map(([name, id]) => <option key={id} value={id}>{name}</option>)}
      </select>
      {
        formats.map((format) => {
          return (
            <label key={format.name}>
              <input
                type="checkbox"
                onChange={evt => store.setformat(format.name, evt.target.checked)}
                checked={!!store.formats.find(f => f.name === format.name)}
              />
              {format.name}
            </label>
          );
        })
      }
      <br />
      <br />
      <span style={{ color: selectedColor.hex }}>{text}</span>
      <br />
      <br />
      {selectedColor.id && (
        <div>
          NO_FORMAT="\033[0m"
          {
            store.formats.map(({ name, code }) => {
              return (
                <div key={name}>
                  {`F_${name.toUpperCase()}="\\033[${code}m"`}
                </div>
              );
            })
          }
          <br />
          C_{selectedColor.name.toUpperCase()}="\033[38;5;{selectedColor.id}"m
          <br />
          {`echo -e "${formatsStr}\${C_${selectedColor.name.toUpperCase()}}${text}\${NO_FORMAT}"`}
        </div>
      )}
    </div>
  );
};

export default observer(HomeScreen);
