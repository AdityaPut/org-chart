import { render, screen } from '@testing-library/react';
import Home from '../page';
import { useInitValidateEmployees } from '@/hooks/employees/useInitValidateEmployees';
import employeesData from '@datasource/employees.json';

jest.mock('@/hooks/employees/useInitValidateEmployees');

describe('Home', () => {
  it('renders the OrganizationChart when there is no error', () => {
    (useInitValidateEmployees as jest.Mock).mockReturnValue({
      employees: employeesData,
      errorText: '',
    });

    render(<Home />);

    // Use queryByTestId instead of getByTestId. queryByTestId returns null instead of throwing an error if the element is not found.
    const organizationChart = screen.getByTestId('organization-chart');

    // Check that the organization chart is in the document.
    expect(organizationChart).toBeInTheDocument();
  });

  it('renders an error alert when there is an error', () => {
    const errorText = 'An error occurred';
    (useInitValidateEmployees as jest.Mock).mockReturnValue({
      employees: [],
      errorText,
    });

    render(<Home />);

    expect(screen.getByText(errorText)).toBeInTheDocument();
  });
});