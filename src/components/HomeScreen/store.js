import { observable, action, computed } from 'mobx';
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

    const formatsStr = formats.map(f => `\${F_${f.name.toUpperCase()}}`).join('');
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
