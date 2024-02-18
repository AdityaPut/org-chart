'use client';

import FilterGroup from '@/components/FilterGroup';
import OrganizationNode from '@/components/OrganizationNode';
import { FilterProvider } from '@/context/filter';
import { useGetNestedEmployees } from '@/hooks/employees/useGetNestedEmployees';
import type { Employee } from '@/types';
import { useState } from 'react';

type OrganizationChartProps = {
  employeesData: Employee[];
};

export default function OrganizationChart(props: OrganizationChartProps) {
  const { employeesData } = props;
  const [filterQuery, setFilterQuery] = useState('');
  const nestedEmployees = useGetNestedEmployees(
    structuredClone(employeesData),
    filterQuery
  );
  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
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
