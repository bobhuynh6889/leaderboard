import DeviceInfo from 'react-native-device-info';

/**
 * Function to check if the device is an iPhone with a notch
 * @returns {boolean} - Returns true if the device has a notch, false otherwise
 */
export const hasNotch = () => {
  return DeviceInfo.hasNotch();
};
