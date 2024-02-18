'use client';

import { EmployeesValidator } from '@/lib/validator/employeesValidator';
import type { Employee } from '@/types';
import { useMemo } from 'react';

type UseInitValidateEmployees = {
  employees: Employee[];
  errorText?: string;
};

export const useInitValidateEmployees = (
  employees: Employee[]
): UseInitValidateEmployees => {
  return useMemo(() => {
    try {
      const validate = new EmployeesValidator(employees);
      validate.duplicateEmployeeIds().notHavingHierarchy();
    } catch (err) {
      const error = err as Error;
      console.error(error);
      return { employees: [], errorText: error.message };
    }

    return { employees };
  }, [employees]);
};
