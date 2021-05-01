import React, { Children, Fragment, PropsWithChildren } from 'react';
import MarkedListItem from './MarkedListItem';
import { MarkedListProps } from './shared-types';
import useMarkedList from './useMarkedList';

/**
 * A component which given a counter style, wraps each of its children with a
 * {@link MarkedListItem}. The latter prepends the child with a marker
 * box containing a marker string representation for this child index.
 *
 * See {@link https://www.w3.org/TR/css-lists-3/#markers | CSS Lists and Counters Module Level 3, Markers}.
 *
 * @public
 */
export default function MarkedList({
  children,
  Container = Fragment,
  ...props
}: PropsWithChildren<MarkedListProps>) {
  const normalChildren = Children.toArray(children);
  const listProps = useMarkedList({ ...props, length: normalChildren.length });
  return React.createElement(
    Container,
    {},
    normalChildren.map((child, index) => {
      return (
        <MarkedListItem key={index} index={index} {...listProps}>
          {child}
        </MarkedListItem>
      );
    })
  );
}
