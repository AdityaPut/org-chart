import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@components/ui/Card';

describe('Card', () => {
  it('renders correctly and displays the correct text', () => {
    const title = 'Test Title';
    const description = 'Test Description';
    const content = 'Test Content';

    render(
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{content}</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    );

    // Check that the card and its subcomponents are in the document
    const cardTitle = screen.getByText(title);
    const cardDescription = screen.getByText(description);
    const cardContent = screen.getByText(content);

    expect(cardTitle).toBeInTheDocument();
    expect(cardDescription).toBeInTheDocument();
    expect(cardContent).toBeInTheDocument();
  });
});