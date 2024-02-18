import { renderHook } from '@testing-library/react';
import { useGetInitialName } from '@hooks/useGetInitialName';

describe('useGetInitialName', () => {
  it('computes the correct initials from a full name', () => {
    const { result, rerender } = renderHook(({ fullname }) => useGetInitialName(fullname), {
      initialProps: { fullname: 'John Doe' },
    });
    // Check that the initials are correct
    expect(result.current).toBe('JD');

    // Update the props and check that the initials are updated correctly
    rerender({ fullname: 'Jane' });
    expect(result.current).toBe('J');
  });
  it('should return undefined when the full name is empty', () => {
    const { result } = renderHook(() => useGetInitialName(''));
    expect(result.current).toBeUndefined();
  })
});