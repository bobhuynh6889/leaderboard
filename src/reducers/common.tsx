import * as types from '../action/ActionTypes';
import { UserModel } from '../models';

interface CommonState {
  convertedData: UserModel[];
}

export interface SaveConvertDataAction {
  type: typeof types.SAVE_CONVERT_DATA;
  convertedData: UserModel[];
}

const INITIAL_STATE: CommonState = {
  convertedData: [],
};

type CommonAction = SaveConvertDataAction;

const common = (
  state: CommonState = INITIAL_STATE,
  action: CommonAction,
): CommonState => {
  switch (action.type) {
    case types.SAVE_CONVERT_DATA:
      return {
        ...state,
        convertedData: action.convertedData,
      };
    default:
      return state;
  }
};

export default common;
