import configureMockStore from 'redux-mock-store';
import * as types from '../../src/action/ActionTypes';
import {saveConvertData} from '../../src/action/common';
import {UserModel} from '../../src/models';

const mockStore = configureMockStore([]);

describe('Redux actions and store integration', () => {
  it('should dispatch SAVE_CONVERT_DATA action correctly', () => {
    const store = mockStore({convertedData: []});

    const mockData: UserModel[] = [
      {name: 'Bob', bananas: 100, rank: 10, uid: '123abc'},
    ];

    const expectedActions = [
      {
        type: types.SAVE_CONVERT_DATA,
        convertedData: mockData,
      },
    ];

    store.dispatch(saveConvertData(mockData));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
