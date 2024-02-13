'use client';

import { OrganizationNode } from '@/components/OrganizationNode';
import { useGetNestedEmployees } from '@/hooks/employees/useGetNestedEmployees';
import employeesData from '@datasource/employees.json';

export default function Home() {
  const nestedEmployees = useGetNestedEmployees(structuredClone(employeesData));
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {nestedEmployees.map((employee) => (
        <OrganizationNode key={employee.id} employee={employee} />
      ))}
    </main>
  );
}
