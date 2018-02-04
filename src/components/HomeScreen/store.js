import { observable, action } from 'mobx';
import colors from './colors-256';
import formats from './formats';

export default class Store {
  @observable selectedColor = {};
  @observable selectedBgColor = {};
  @observable text = 'Color me, surprised';
  @observable formats = [];

  @action setColor(id) {
    this.setAColor('selectedColor', id);
  }

  @action setBgColor(id) {
    this.setAColor('selectedBgColor', id);
  }

  @action setformat(name, enabled) {
    if (enabled) this.formats = [...this.formats, formats.find(f => f.name === name)];
    else this.formats = this.formats.filter(f => f.name !== name);
  }

  @action setAColor(field, id) {
    if (id) {
      const [name,, hex] = colors.find(c => c[1] === Number(id));
      this[field] = { id, hex, name };
    } else this[field] = {};
  }
}
