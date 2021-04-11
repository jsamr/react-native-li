import React, { Children, Fragment, PropsWithChildren } from 'react';
import MarkerListLine from './MarkerListLine';
import { MarkerListProps } from './shared-types';
import useMarkerList from './useMarkerList';

/**
 * @public
 */
export default function MarkerList({
  children,
  ...props
}: PropsWithChildren<MarkerListProps>) {
  const normalChildren = Children.toArray(children);
  const listProps = useMarkerList({ ...props, length: normalChildren.length });
  return React.createElement(
    Fragment,
    {},
    normalChildren.map((child, index) => {
      return (
        <MarkerListLine key={index} index={index} {...listProps}>
          {child}
        </MarkerListLine>
      );
    })
  );
}
