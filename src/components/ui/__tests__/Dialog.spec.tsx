import { render, screen } from '@testing-library/react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@components/ui/Dialog';

describe('Dialog', () => {
  it('renders correctly and displays the correct title and description', () => {
    const title = 'Test Title';
    const description = 'Test Description';

    render(
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    // Check that the dialog and its subcomponents are in the document
    const dialogTitle = screen.getByText(title);
    const dialogDescription = screen.getByText(description);

    expect(dialogTitle).toBeInTheDocument();
    expect(dialogDescription).toBeInTheDocument();
  });
});