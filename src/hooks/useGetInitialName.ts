import { useState, useEffect } from 'react';

export const useGetInitialName = (fullname?: string) => {
  const [name, setName] = useState<string>();

  const getInitialName = (name?: string) => {
    if (!name) return;
    const [first, last = ''] = name.split(' ');
    return first.charAt(0) + last.charAt(0);
  };

  useEffect(() => {
    const initialName = getInitialName(fullname)?.toUpperCase();
    setName(initialName);
  }, [fullname]);

  return name;
};
