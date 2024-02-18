'use client';

import OrganizationChart from '@/components/OrganizationChart';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert';
import { useInitValidateEmployees } from '@/hooks/employees/useInitValidateEmployees';
import { isEmpty } from '@/lib/utils';
import employeesData from '@datasource/employees.json';
import { AlertCircle } from 'lucide-react';
import structuredClone from '@ungap/structured-clone';

export default function Home() {
  const { employees, errorText } = useInitValidateEmployees(
    structuredClone(employeesData)
  );
  return (
    <>
      {isEmpty(errorText) ? (
        <OrganizationChart employeesData={employees} />
      ) : (
        <main className='flex min-h-screen flex-col items-center p-24'>
          <Alert variant='destructive' className='max-w-xl'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorText}</AlertDescription>
          </Alert>
        </main>
      )}
    </>
  );
}
