import { observable, action, computed } from 'mobx';
import colors from './colors-256';
import formats from './formats';

class Color {
  constructor([name, id, hex]) {
    this.name = name;
    this.id = id;
    this.hex = hex;
  }
}

export default class Store {
  @observable selectedColor = new Color(colors.find(c => c[0] === 'Black'));
  @observable selectedBgColor = {};
  @observable text = 'Color me, surprised';
  @observable formats = [];

  constructor() {
    this.setColor = this.setColor.bind(this);
    this.setBgColor = this.setBgColor.bind(this);
    this.setFormat = this.setFormat.bind(this);
  }

  @action setColor(id) {
    this.setAColor('selectedColor', id);
  }

  @action setBgColor(id) {
    this.setAColor('selectedBgColor', id);
  }

  @action setFormat(name, enabled) {
    if (enabled) this.formats = [...this.formats, formats.find(f => f.name === name)];
    else this.formats = this.formats.filter(f => f.name !== name);
  }

  @action setAColor(field, id) {
    if (id) {
      const color = colors.find(c => c[1] === Number(id));
      this[field] = new Color(color);
    } else this[field] = {};
  }

  @computed get outputLines() {
    const { selectedColor, selectedBgColor, text } = this;

    const lines = [
      'NO_FORMAT="\\033[0m"',
      ...this.formats.map(({ name, code }) => `F_${name.toUpperCase()}="\\033[${code}m"`),
    ];
    const fgColor = Store.colorLine(selectedColor);
    const bgColor = Store.colorLine(selectedBgColor, 'bg');
    if (fgColor) lines.push(fgColor);
    if (bgColor) lines.push(bgColor);

    const formatsStr = this.formats.map(f => `\${F_${f.name.toUpperCase()}}`).join('');
    const colorStr = selectedColor.id ? `\${C_${selectedColor.name.toUpperCase()}}` : '';
    const bgColorStr = selectedBgColor.id ? `\${C_${selectedBgColor.name.toUpperCase()}}` : '';
    lines.push(`echo -e "${formatsStr}${colorStr}${bgColorStr}${text}\${NO_FORMAT}"`);

    return lines;
  }

  static colorLine(color, type = 'fg') {
    const code = type === 'fg' ? '38;5;' : '48;5;';
    return color.id && `C_${color.name.toUpperCase()}="\\033[${code}${color.id}m"`;
  }
}