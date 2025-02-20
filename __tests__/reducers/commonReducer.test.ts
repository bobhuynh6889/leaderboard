import reducer, { SaveConvertDataAction } from '../../src/reducers/common';
import * as types from '../../src/action/ActionTypes';
import {UserModel} from '../../src/models';

describe('common reducer', () => {
  const INITIAL_STATE = {
    convertedData: [],
  };

  it('should return the initial state when no action is provided', () => {
    expect(
      reducer(undefined, {
        type: 'SAVE_CONVERT_DATA',
        convertedData: [],
      }),
    ).toEqual(INITIAL_STATE);
  });

  it('should handle SAVE_CONVERT_DATA', () => {
    const mockData: UserModel[] = [
      {name: 'Bob', bananas: 100, rank: 10, uid: '123abc'},
    ];

    const action: SaveConvertDataAction = {
      type: types.SAVE_CONVERT_DATA,
      convertedData: mockData,
    };

    const expectedState = {
      convertedData: mockData,
    };

    expect(reducer(INITIAL_STATE, action)).toEqual(expectedState);
  });
});
