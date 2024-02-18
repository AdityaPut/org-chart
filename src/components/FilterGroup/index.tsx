import type { Employee } from '@/types';
import { Combobox } from '@components/ui/Combobox';
import { Button } from '@components/ui/Button';
import { useMemo, useState } from 'react';
import { useFilter } from '@/context/filter';

type FilterGroupProps = {
  employees: Employee[];
};

const FilterGroup = (props: FilterGroupProps) => {
  const { employees } = props;
  const { filterQuery,onSearchChange } = useFilter();
  const options = useMemo(
    () =>
      employees.map((employee) => {
        return {
          value: employee.id.toString(),
          label: employee.name.charAt(0).toUpperCase() + employee.name.slice(1),
        };
      }),
    [employees]
  );

  return (
    <div className='flex justify-end w-full pb-2'>
      <Combobox
        name='employee'
        options={options}
        onSearchChange={onSearchChange}
        searchQuery={filterQuery}
      />
      <Button
        className='ml-2'
        variant={'destructive'}
        onClick={() => {
          onSearchChange('');
        }}
      >
        Reset
      </Button>
    </div>
  );
};

export default FilterGroup;
