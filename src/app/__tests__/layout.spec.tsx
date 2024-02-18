import { render, screen } from '@testing-library/react';
import RootLayout from '../layout';

describe('RootLayout', () => {
  it('renders the NavMenu', () => {
    const testId = 'child-component';
    render(
      <RootLayout>
        <main data-testid={testId}>test</main>
      </RootLayout>
    );

    // Check that the NavMenu is rendered
    expect(screen.getByTestId('nav-menu')).toBeInTheDocument();
  });

  it('renders the children', () => {
    const testId = 'child-component';
    render(
      <RootLayout>
        <main data-testid={testId}>test</main>
      </RootLayout>
    );

    // Check that the child component is rendered
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
