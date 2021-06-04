import React from 'react';
import { render } from '@testing-library/react-native';
import MarkedList from '../MarkedList';
import { StyleSheet, Text } from 'react-native';
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

  it('should reverse list items with rtlLineReversed', () => {
    const { getByTestId } = render(
      <MarkedList counterRenderer={presets.disc} rtlLineReversed>
        <Text style={{ flexShrink: 1 }}>Lorem</Text>
      </MarkedList>
    );
    const li = getByTestId('marked-list-item');
    expect(StyleSheet.flatten(li.props.style)).toMatchObject({
      flexDirection: 'row-reverse'
    });
  });
  it('should reverse marker prefix, counter and suffix order with rtlMarkerReversed', () => {
    const { getByTestId } = render(
      <MarkedList counterRenderer={presets.disc} rtlMarkerReversed>
        <Text style={{ flexShrink: 1 }}>Lorem</Text>
      </MarkedList>
    );
    const mb = getByTestId('marker-box');
    expect(mb.props.children).toBe('\u00A0•');
  });
  it('should allow to customize rtlMarkerReversed', () => {
    const { getByTestId } = render(
      <MarkedList
        counterRenderer={presets.decimal}
        startIndex={10}
        rtlMarkerReversed={{ reverseCounter: true, reversePrefix: false }}>
        <Text style={{ flexShrink: 1 }}>Lorem</Text>
      </MarkedList>
    );
    const mb = getByTestId('marker-box');
    expect(mb.props.children).toBe('\u00A0.01');
  });
});
