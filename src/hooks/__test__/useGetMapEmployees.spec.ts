import { renderHook } from '@testing-library/react-hooks';
import { useGetMapEmployees } from '@hooks/employees/useGetMapEmployees';
import type { Employee } from '@/types';

describe('useGetMapEmployees', () => {
  it('maps the employees by their id', () => {
    const employees: Employee[] = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ];

    const { result, rerender } = renderHook(
      ({ employees }) => useGetMapEmployees(employees),
      {
        initialProps: { employees },
      }
    );

    // Check that the employees are mapped correctly
    expect(result.current).toEqual({
      1: { id: 1, name: 'John Doe' },
      2: { id: 2, name: 'Jane Smith' },
    });

    // Update the props and check that the employees are updated correctly
    rerender({ employees: [] });
    expect(result.current).toEqual({});
  });
});
