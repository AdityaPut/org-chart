'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/Avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@components/ui/Card';
import { useGetInitialName } from '@/hooks/useGetInitialName';
import type { Employee } from '@/types';
import { cn } from '@lib/utils';

type EmployeeCardProps = {
  employee: Employee;
  className?: string;
};

const EmployeeCard = (props: EmployeeCardProps) => {
  const { employee, className } = props;
  const { name, avatar, role } = employee;
  const initialName = useGetInitialName(name);
  return (
    <Card className={cn('w-44 h-[185px]', className)}>
      <CardContent className='flex flex-col justify-center items-center gap-1 p-2'>
        {avatar && (
          <div className='relative'>
            <Avatar className='w-[100px] h-[100px] my-2'>
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback className='text-2xl'>{initialName}</AvatarFallback>
            </Avatar>
          </div>
        )}
        <CardTitle className='capitalize'>{name}</CardTitle>
        <CardDescription>{role}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
