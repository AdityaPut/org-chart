import { render, screen } from '@testing-library/react';
import { Alert, AlertTitle, AlertDescription } from '../Alert';

describe('Alert', () => {
  it('renders the alert with title and description', () => {
    const testTitle = 'Test Alert Title';
    const testDescription = 'Test Alert Description';
    render(
      <Alert>
        <AlertTitle>{testTitle}</AlertTitle>
        <AlertDescription>{testDescription}</AlertDescription>
      </Alert>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(testTitle)).toBeInTheDocument();
    expect(screen.getByText(testDescription)).toBeInTheDocument();
  });
});
