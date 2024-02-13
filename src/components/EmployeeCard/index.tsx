'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';
import type { Employee } from '@/types';
import { useGetInitialName } from '@/hooks/useGetInitialName';

type EmployeeCardProps = {
  employee: Employee;
};

const EmployeeCard = (props: EmployeeCardProps) => {
  const { employee } = props;
  const { name, avatar, role } = employee;
  const initialName = useGetInitialName(name);
  return (
    <Card className='w-44 h-[185px]'>
      <CardContent className='flex flex-col justify-center items-center gap-1 p-2'>
        {avatar && (
          <Avatar className='w-[100px] h-[100px] my-2'>
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{initialName}</AvatarFallback>
          </Avatar>
        )}
        <CardTitle>{name}</CardTitle>
        <CardDescription>{role}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
