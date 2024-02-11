export type Employee = {
  id: number;
  name: string;
  managerId?: number | null;
  role?: string;
  avatar?: string;
  children?: Employee[];
};

export type EmployeeMap = Record<number, Employee>;
