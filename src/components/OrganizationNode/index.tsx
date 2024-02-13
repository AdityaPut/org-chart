'use client';

import { Employee } from '@/types';
import EmployeeCard from '../EmployeeCard';

type OrganizationNodeProps = {
  employee: Employee;
};

export const OrganizationNode = (props: OrganizationNodeProps) => {
  const { employee } = props;

  if (employee.children) {
    return (
      <div className='flex flex-col items-center'>
        <EmployeeCard employee={employee} />
        <div
          className={'grid gap-4 mt-8'}
          style={{
            gridTemplateColumns: `repeat(${employee.children.length}, 1fr)`,
          }}
        >
          {employee.children.map((employee) => (
            <OrganizationNode key={employee.id} employee={employee} />
          ))}
        </div>
      </div>
    );
  }

  return <EmployeeCard employee={employee} />;
};
