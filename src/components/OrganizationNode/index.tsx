'use client';

import { Employee } from '@/types';
import EmployeeCard from '../EmployeeCard';
import { isEmpty, cn, isArray, isUndefined } from '@lib/utils';
import type { ReactNode } from 'react';

type OrganizationNodeProps = {
  employee: Employee;
  index?: number;
  totalSiblings?: number;
};

const ItemWithNodeLine = (
  props: OrganizationNodeProps & { children: ReactNode }
) => {
  const { employee, children, index, totalSiblings = 1 } = props;

  const getClassNames = () => {
    if (totalSiblings === 1 || isUndefined(index)) {
      return 'border-t-0';
    }
    // if the index and the totalSiblings more than 1, the line will be on the right side of the card
    if (index === 0 && totalSiblings > 1) {
      return 'self-end border-r-0 border-l-2';
    }
    // if the index is the last one, the line will be on the left side of the card
    if (index === totalSiblings - 1) {
      return 'self-start border-l-0 border-r-2';
    }
    // otherwise, the line will be full on the top of the card
    return 'border-t-2 w-full border-r-0 ';
  };
  return (
    <div className='flex flex-col items-center '>
      {!isEmpty(employee.managerId) && (
        <div
          className={cn(
            'h-5 w-[50%] border-gray-300 border-r-2 border-t-2 self-start',
            getClassNames()
          )}
        />
      )}
      {children}
    </div>
  );
};

export const OrganizationNode = (props: OrganizationNodeProps) => {
  const { employee } = props;

  const renderEmployeeCard = () => (
    <ItemWithNodeLine {...props}>
      <EmployeeCard employee={employee} className='mx-1.5' />
    </ItemWithNodeLine>
  );

  if (isArray(employee?.children)) {
    return (
      <div>
        {renderEmployeeCard()}
        {/* The second node line is always located in the middle of the card */}
        <div className='h-5 w-[50%] self-start border-gray-300 border-r-2' />
        <div
          className={'grid '}
          style={{
            gridTemplateColumns: `repeat(${employee.children.length}, 1fr)`,
          }}
        >
          {employee.children.map((emp, index) => {
            return (
              <OrganizationNode
                key={emp.id}
                employee={emp}
                index={index}
                totalSiblings={employee.children?.length}
              />
            );
          })}
        </div>
      </div>
    );
  }

  return renderEmployeeCard();
};
