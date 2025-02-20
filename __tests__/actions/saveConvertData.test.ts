import {saveConvertData} from '../../src/action/common';
import * as types from '../../src/action/ActionTypes';
import {UserModel} from '../../src/models';

describe('saveConvertData action', () => {
  it('should create an action to save converted data', () => {
    const mockData: UserModel[] = [
      {name: 'Bob', bananas: 100, rank: 10, uid: '123abc'},
    ];

    const expectedAction = {
      type: types.SAVE_CONVERT_DATA,
      convertedData: mockData,
    };

    expect(saveConvertData(mockData)).toEqual(expectedAction);
  });
});
