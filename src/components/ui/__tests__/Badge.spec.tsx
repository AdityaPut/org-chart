import { render, screen } from '@testing-library/react';
import { Badge } from '@components/ui/Badge';

describe('Badge', () => {
  it('renders correctly and displays the correct text', () => {
    const text = 'Test Badge';
    render(<Badge>{text}</Badge>);

    // Check that the badge is in the document
    const badge = screen.getByText(text);
    expect(badge).toBeInTheDocument();

    // Check that the badge displays the correct text
    expect(badge).toHaveTextContent(text);
  });

  it('applies the correct variant class', () => {
    render(<Badge variant="destructive">Test</Badge>);
    const badge = screen.getByText('Test');
    expect(badge).toHaveClass('bg-red-500');
  });
});