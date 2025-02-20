import { UserModel } from '../models';
import * as types from './ActionTypes';

export function saveConvertData(convertedData: UserModel[]): {
  type: string;
  convertedData: UserModel[];
} {
  return {
    type: types.SAVE_CONVERT_DATA,
    convertedData,
  };
}
