import { observable, action } from 'mobx';
import colors from './colors-256';
import formats from './formats';

export default class Store {
  @observable selectedColor = {};
  @observable text = 'Color me surprised ;)';
  @observable formats = [];

  @action setColor(id) {
    const [name,, hex] = colors.find(c => c[1] === Number(id));
    this.selectedColor = { id, hex, name };
  }

  @action setformat(name, enabled) {
    console.log(enabled);
    console.log(formats.find(f => f.name === name));
    if (enabled) this.formats = [...this.formats, formats.find(f => f.name === name)];
    else this.formats = this.formats.filter(f => f.name !== name);
  }
}
