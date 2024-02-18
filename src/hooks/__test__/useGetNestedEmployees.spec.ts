import { renderHook } from '@testing-library/react-hooks';
import { useGetNestedEmployees } from '@hooks/employees/useGetNestedEmployees';
import type { Employee } from '@/types';

describe('useGetNestedEmployees', () => {
  it('nests the employees and computes the total descendants for each employee', () => {
    const employees: Employee[] = [
      { id: 1, name: 'John Doe', managerId: null },
      { id: 2, name: 'Jane Smith', managerId: 1 },
      { id: 3, name: 'Bob Johnson', managerId: 2 },
    ];

    const { result, rerender } = renderHook(
      ({ employees, filterQuery }) =>
        useGetNestedEmployees(employees, filterQuery),
      {
        initialProps: { employees, filterQuery: '' },
      }
    );

    // Check that the employees are nested correctly and the total descendants are computed correctly
    expect(result.current).toEqual([
      {
        id: 1,
        name: 'John Doe',
        managerId: null,
        descendantsTotal: 2,
        children: [
          {
            id: 2,
            name: 'Jane Smith',
            managerId: 1,
            descendantsTotal: 1,
            children: [
              { id: 3, name: 'Bob Johnson', managerId: 2 },
            ],
          },
        ],
      },
    ]);

    // Update the props and check that the employees are updated correctly
    rerender({ employees: [], filterQuery: '' });
    expect(result.current).toEqual([]);
  });
});
