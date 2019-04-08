import 'react-native';
import React from 'react';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import { shallow } from 'enzyme';

import App from '../src/App';

jest.mock('react-dom');

describe('When App is rendered', () => {
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('does not crash', async () => {
    const tree = shallow(<App />);
    expect(tree).toBeTruthy();
  });

  it('renders the app like the snapshot', async () => {
    const tree = shallow(<App />);
    expect(tree).toMatchSnapshot();
  });
});

