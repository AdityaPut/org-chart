'use client';

import type { Employee, EmployeeMap } from '@/types';
import { isEmpty } from '@lib/utils';
import { useMemo } from 'react';
import { useGetMapEmployees } from './useGetMapEmployees';

const sortEmployeesByManagerId = (employees: Employee[]) => {
  return employees.sort((a, b) => (a.managerId ?? 0) - (b.managerId ?? 0));
};

const convertNestedEmployees = (
  employees: Employee[],
  mapEmployees: EmployeeMap
) => {
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

// count the total descendants of each employee with recursion
const getEmployeesWithDescendantsTotal = (
  employees: Employee[]
): Employee[] => {
  return employees.map((employee) => {
    if (employee.children) {
      const chilrenEmployees = getEmployeesWithDescendantsTotal(
        employee.children
      );
      employee.descendantsTotal = chilrenEmployees.reduce(
        (acc, e) => acc + (e.descendantsTotal ?? 0),
        chilrenEmployees.length
      );
    }
    return employee;
  });
};

export const useGetNestedEmployees = (
  flattenEmployees: Employee[]
): Employee[] => {
  const mapEmployees = useGetMapEmployees(flattenEmployees);

  return useMemo(() => {
    const sortedEmployees = sortEmployeesByManagerId(flattenEmployees);
    const nestedEmployees = convertNestedEmployees(
      sortedEmployees,
      mapEmployees
    );
    const employeesWithDescendantsTotal =
      getEmployeesWithDescendantsTotal(nestedEmployees);
    return employeesWithDescendantsTotal;
  }, [flattenEmployees, mapEmployees]);
};
