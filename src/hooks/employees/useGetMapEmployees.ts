import type { Employee, EmployeeMap } from '@/types';
import { useMemo } from 'react';

export const useGetMapEmployees = (employees: Employee[]): EmployeeMap => {
  return useMemo(
    () =>
      employees.reduce((acc, employee) => {
        acc[employee.id] = employee;
        return acc;
      }, {} as EmployeeMap),
    [employees]
  );
};
