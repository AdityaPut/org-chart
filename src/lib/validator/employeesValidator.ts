import type { Employee } from '@/types';
import { isEmpty } from '../utils';

export class EmployeesValidator {
  employees: Employee[];
  constructor(employees: Employee[]) {
    this.employees = employees;
  }

  duplicateEmployeeIds() {
    const ids = this.employees.map((e) => e.id);
    const hasDuplicateIds = new Set(ids).size !== ids.length;
    if (hasDuplicateIds) {
      const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
      const currentEmployee = this.employees.find(
        (e) => e.id === duplicateIds[0]
      );
      const currentManagers = this.employees.filter(
        (e) => e.managerId === currentEmployee?.managerId
      );
      const managerNames = currentManagers.map((e) => e.name).join(', ');
      throw new Error(
        `Unable to process employee tree. ${currentEmployee?.name} has multiple managers: ${managerNames}`
      );
    }
    return this;
  }

  notHavingHierarchy() {
    const employeesWithoutHierarchy = this.employees.filter((e) => {
      // check if the employee is not having manager
      // and that employee is not a manager of any other employee
      return (
        isEmpty(e.managerId) &&
        !this.employees.some((ee) => ee.managerId === e.id)
      );
    });
    if (employeesWithoutHierarchy.length > 1) {
      const employeeNames = employeesWithoutHierarchy
        .map((e) => e.name)
        .join(', ');
      throw new Error(
        `Unable to process employee hierarchy. ${employeeNames} not having hierarchy`
      );
    }
    return this;
  }
}
