import React, { Children, Fragment, PropsWithChildren } from 'react';
import MarkedListItem from './MarkedListItem';
import { MarkedListProps } from './shared-types';
import useMarkedList from './useMarkedList';

/**
 * @public
 */
export default function MarkedList({
  children,
  ...props
}: PropsWithChildren<MarkedListProps>) {
  const normalChildren = Children.toArray(children);
  const listProps = useMarkedList({ ...props, length: normalChildren.length });
  return React.createElement(
    Fragment,
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
