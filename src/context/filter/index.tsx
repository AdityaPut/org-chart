// Modules
import { createContext, useContext } from 'react';

// Types
import type { FC } from 'react';

type FilterProvider = {
  initialState: FilterContext;
  children: React.ReactNode;
};

export type FilterContext = {
  filterQuery: string;
  onSearchChange: (query: string) => void;
};

export const FilterContext = createContext<FilterContext>({
  filterQuery: '',
  onSearchChange: () => {},
});

export const useFilter = () => useContext(FilterContext);

export const FilterProvider: FC<FilterProvider> = (props) => {
  const { children, initialState } = props;

  return (
    <FilterContext.Provider value={initialState}>
      {children}
    </FilterContext.Provider>
  );
};
