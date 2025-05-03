// code/ui.js
import { FONT_FAMILY, FONT_STYLE, LABEL_COLOR, STAR_COLOR, TEXT_COLOR } from './constants.js';

export function createStatText(scene, label, value, y) {
  const labelText = scene.add.text(20, y, `${label}:`, {
    fontSize: '30px',
    fontFamily: FONT_FAMILY,
    fontStyle: FONT_STYLE,
    color: TEXT_COLOR,
    align: 'left',
    shadow: {
      offsetX: 1,
      offsetY: 1,
      color: '#000000',
      blur: 3,
      fill: true
    }
  }).setAlpha(0).setTint(LABEL_COLOR);

  const stars = scene.add.text(240, y, '★'.repeat(value) + '☆'.repeat(5 - value), {
    fontSize: '30px',
    fontFamily: FONT_FAMILY,
    fontStyle: FONT_STYLE,
    color: TEXT_COLOR,
    align: 'left',
    shadow: {
      offsetX: 1,
      offsetY: 1,
      color: '#000000',
      blur: 3,
      fill: true
    }
  }).setAlpha(0).setTint(STAR_COLOR);

  return [labelText, stars];
}

export function createFloatingText(scene, x, y, content, options = {}) {
  const text = scene.add.text(x, y, content, {
    fontSize: options.fontSize || '28px',
    fontFamily: FONT_FAMILY,
    fontStyle: FONT_STYLE,
    color: options.color || TEXT_COLOR,
    align: 'center',
    lineSpacing: 10,
    shadow: {
      offsetX: 2,
      offsetY: 2,
      color: '#000000',
      blur: 4,
      fill: true
    }
  }).setOrigin(0.5);
  return text;
}
