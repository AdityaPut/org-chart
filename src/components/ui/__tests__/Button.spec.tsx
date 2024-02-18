import { render, screen } from '@testing-library/react';
import { Button } from '@components/ui/Button';

describe('Button', () => {
  it('renders correctly and displays the correct text', () => {
    const buttonText = 'Test Button';
    render(<Button>{buttonText}</Button>);

    // Check that the button is in the document
    const button = screen.getByText(buttonText);
    expect(button).toBeInTheDocument();

    // Check that the button displays the correct text
    expect(button).toHaveTextContent(buttonText);
  });

  it('applies the correct variant class', () => {
    render(<Button variant="destructive">Test</Button>);
    const button = screen.getByText('Test');
    expect(button).toHaveClass('bg-red-500');
  });
});