import React from 'react';
import { render } from '@testing-library/react-native';
import MarkedList from '../MarkedList';
import { Text } from 'react-native';
import * as presets from '@jsamr/counter-style/presets';

describe('MarkedList', () => {
  it('should render children', () => {
    const { UNSAFE_getByType } = render(
      <MarkedList counterRenderer={presets.disc}>
        {[...Array(100).keys()].map((index) => (
          <Text key={index} style={{ flexShrink: 1 }}>
            Lorem
          </Text>
        ))}
      </MarkedList>
    );
    const list = UNSAFE_getByType(MarkedList);
    expect(list.children.length).toBe(100);
  });
});
