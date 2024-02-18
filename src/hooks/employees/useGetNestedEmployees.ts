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

const filterEmployees = (
  mapEmployees: EmployeeMap,
  flattenEmployees: Employee[],
  filterQuery: string
) => {
  if (isEmpty(filterQuery)) {
    return flattenEmployees;
  }

  // if filterQuery is not empty, return the employee and find the employee's parent until the top level
  const selectedEmployees = [];
  let currentEmployee: Employee | undefined =
    mapEmployees[parseInt(filterQuery)];
  while (currentEmployee) {
    selectedEmployees.push(currentEmployee);
    if (currentEmployee.managerId) {
      currentEmployee = mapEmployees[currentEmployee.managerId];
    } else {
      currentEmployee = undefined;
    }
  }
  return selectedEmployees;
};

export const useGetNestedEmployees = (
  flattenEmployees: Employee[],
  filterQuery: string
): Employee[] => {
  const mapEmployees = useGetMapEmployees(flattenEmployees);

  return useMemo(() => {
    const filteredEmployees = filterEmployees(
      mapEmployees,
      flattenEmployees,
      filterQuery
    );
    const sortedEmployees = sortEmployeesByManagerId(filteredEmployees);
    const nestedEmployees = convertNestedEmployees(
      sortedEmployees,
      mapEmployees
    );
    const employeesWithDescendantsTotal =
      getEmployeesWithDescendantsTotal(nestedEmployees);
    return employeesWithDescendantsTotal;
  }, [flattenEmployees, mapEmployees, filterQuery]);
};
