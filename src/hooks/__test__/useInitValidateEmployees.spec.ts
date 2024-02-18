import { renderHook } from '@testing-library/react';
import { useInitValidateEmployees } from '@hooks/employees/useInitValidateEmployees';
import { EmployeesValidator } from '@lib/validator/employeesValidator';
import employeesData from '@datasource/faulty-employees.json';

jest.mock('@/lib/validator/employeesValidator');

describe('useInitValidateEmployees', () => {
  it('validates the employees and returns the correct error message when validation fails', () => {
    const mockEmployeesValidator = EmployeesValidator as jest.MockedClass<
      typeof EmployeesValidator
    >;
    const errorMessage = 'Test error message';
    mockEmployeesValidator.mockImplementation(() => {
      return {
        duplicateEmployeeIds: jest.fn().mockReturnThis(),
        notHavingHierarchy: jest.fn().mockImplementation(() => {
          throw new Error(errorMessage);
        }),
        employees: employeesData,
      };
    });

    const { result } = renderHook(
      ({ employees }) => useInitValidateEmployees(employees),
      {
        initialProps: { employees: employeesData },
      }
    );

    // Check that the employees are empty and the error message is correct when validation fails
    expect(result.current.employees).toEqual([]);
    expect(result.current.errorText).toBe(errorMessage);
  });
});
