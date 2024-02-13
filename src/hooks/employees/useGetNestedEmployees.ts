'use client';

import type { Employee } from '@/types';
import { isEmpty } from '@lib/utils';
import { useMemo } from 'react';
import { useGetMapEmployees } from './useGetMapEmployees';

export const useGetNestedEmployees = (
  flattenEmployees: Employee[]
): Employee[] => {
  const mapEmployees = useGetMapEmployees(flattenEmployees);

  const sortEmployeesByManagerId = (employees: Employee[]) => {
    return employees.sort((a, b) => (a.managerId ?? 0) - (b.managerId ?? 0));
  };

  const convertNestedEmployees = (employees: Employee[]) => {
    return employees.reduce((acc, employee) => {
      // If the employee has no manager, it means it's a top-level employee
      if (isEmpty(employee.managerId)) {
        acc.push(employee);
        return acc;
      }

      // If the employee has a manager, it means push it to the manager's children
      const manager = mapEmployees[employee.managerId];
      if (!isEmpty(manager)) {
        if (!manager.children) {
          manager.children = [];
        }
        // prevent duplicate children
        if (!manager.children.some((e) => e.id === employee.id)) {
          manager.children.push(employee);
        }
      }

      return acc;
    }, [] as Employee[]);
  };

  return useMemo(() => {
    const sortedEmployees = sortEmployeesByManagerId(flattenEmployees);
    const nestedEmployees = convertNestedEmployees(sortedEmployees);
    return nestedEmployees;
  }, [flattenEmployees]);
};
