'use client';

import FilterGroup from '@/components/FilterGroup';
import OrganizationNode from '@/components/OrganizationNode';
import { FilterProvider } from '@/context/filter';
import { useGetNestedEmployees } from '@/hooks/employees/useGetNestedEmployees';
import employeesData from '@datasource/employees.json';
import { useState } from 'react';

export default function Home() {
  const [filterQuery, setFilterQuery] = useState('');
  const nestedEmployees = useGetNestedEmployees(
    structuredClone(employeesData),
    filterQuery
  );
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <FilterProvider
        initialState={{
          filterQuery,
          onSearchChange: (search) => {
            setFilterQuery(search);
          },
        }}
      >
        <FilterGroup employees={employeesData} />
      </FilterProvider>
      {nestedEmployees.map((employee) => (
        <OrganizationNode key={employee.id} employee={employee} />
      ))}
    </main>
  );
}
