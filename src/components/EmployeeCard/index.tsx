'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/Avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@components/ui/Card';
import { Badge } from '@components/ui/Badge';
import { useGetInitialName } from '@/hooks/useGetInitialName';
import type { Employee } from '@/types';
import { cn, isEmpty } from '@lib/utils';

type EmployeeCardProps = {
  employee: Employee;
  className?: string;
};

const EmployeeCard = (props: EmployeeCardProps) => {
  const { employee, className } = props;
  const { name, avatar, role, descendantsTotal } = employee;
  const initialName = useGetInitialName(name);
  return (
    <Card className={cn('w-44 h-[185px]', className)}>
      <CardContent className='flex flex-col justify-center items-center gap-1 p-2'>
        {avatar && (
          <div className='relative'>
            <Avatar className='w-[100px] h-[100px] my-2'>
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback className='text-2xl'>
                {initialName}
              </AvatarFallback>
            </Avatar>
            {!isEmpty(descendantsTotal) && (
              <Badge className='absolute bottom-1 right-0'>
                {descendantsTotal}
              </Badge>
            )}
          </div>
        )}
        <CardTitle className='capitalize'>{name}</CardTitle>
        <CardDescription>{role}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
