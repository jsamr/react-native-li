import { renderHook } from '@testing-library/react-hooks';
import useMarkedList from '../useMarkedList';
import decimal from '@jsamr/counter-style/presets/decimal';

const counterRenderer = decimal;
describe('useMarkedList', () => {
  it('should compute maxNumOfCodepoints correctly', () => {
    const expectedLen = counterRenderer.maxMarkerLenInRange(1, 9);
    const { result } = renderHook(() =>
      useMarkedList({ counterRenderer, length: 9 })
    );
    expect(result.current.maxNumOfCodepoints).toBe(expectedLen);
  });
  it('should account for startIndex when computing maxNumOfCodepoints', () => {
    const expectedLen = counterRenderer.maxMarkerLenInRange(2, 10);
    const { result } = renderHook(() =>
      useMarkedList({ counterRenderer, length: 9, startIndex: 2 })
    );
    expect(result.current.maxNumOfCodepoints).toBe(expectedLen);
  });
  it('should work with 0 lengths', () => {
    const expectedLen = counterRenderer.maxMarkerLenInRange(2, 1);
    const { result } = renderHook(() =>
      //@ts-expect-error
      useMarkedList({ counterRenderer, startIndex: 2 })
    );
    expect(result.current.maxNumOfCodepoints).toBe(expectedLen);
  });
});
