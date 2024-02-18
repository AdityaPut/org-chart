import { EmployeesValidator } from '../employeesValidator';

describe('EmployeesValidator', () => {
  it('throws an error if there are duplicate employee IDs', () => {
    const employees = [
      { id: 1, name: 'Alice', managerId: 2 },
      { id: 1, name: 'Bob', managerId: 2 },
      { id: 2, name: 'Charlie', managerId: null },
    ];
    const validator = new EmployeesValidator(employees);
    expect(() => validator.duplicateEmployeeIds()).toThrowError();
  });

  it('does not throw an error if there are no duplicate employee IDs', () => {
    const employees = [
      { id: 1, name: 'Alice', managerId: 2 },
      { id: 3, name: 'Bob', managerId: 2 },
      { id: 2, name: 'Charlie', managerId: null },
    ];
    const validator = new EmployeesValidator(employees);
    expect(() => validator.duplicateEmployeeIds()).not.toThrowError();
  });

  it('throws an error if there are employees not having hierarchy', () => {
    const employees = [
      { id: 1, name: 'Alice', managerId: null },
      { id: 2, name: 'Bob', managerId: null },
    ];
    const validator = new EmployeesValidator(employees);
    expect(() => validator.notHavingHierarchy()).toThrowError();
  });

  it('does not throw an error if all employees have hierarchy', () => {
    const employees = [
      { id: 1, name: 'Alice', managerId: 2 },
      { id: 2, name: 'Bob', managerId: null },
    ];
    const validator = new EmployeesValidator(employees);
    expect(() => validator.notHavingHierarchy()).not.toThrowError();
  });
});
