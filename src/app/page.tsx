'use client';

import OrganizationChart from '@/components/OrganizationChart';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert';
import { useInitValidateEmployees } from '@/hooks/employees/useInitValidateEmployees';
import { isEmpty } from '@/lib/utils';
import employeesData from '@datasource/employees.json';
import { AlertCircle } from 'lucide-react';

export default function Home() {
  const { employees, errorText } = useInitValidateEmployees(
    structuredClone(employeesData)
  );
  return (
    <>
      {isEmpty(errorText) ? (
        <OrganizationChart employeesData={employees} />
      ) : (
        <div className='max-w-xl'>
          <Alert variant='destructive'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorText}</AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
}
