import {WIDTH, HEIGHT} from '../common/constants';
import {Platform} from 'react-native';

export function fontSize(value) {
  if (Platform.isPad) {
    return (value / 100) * HEIGHT;
  }
  return (value / 100) * WIDTH;
}

export function wp(value) {
  return (value / 100) * WIDTH;
}

export function hp(value) {
  return (value / 100) * HEIGHT;
}
