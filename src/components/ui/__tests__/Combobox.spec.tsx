import { render, fireEvent } from '@testing-library/react';
import { Combobox } from '@components/ui/Combobox';

describe('Combobox', () => {
  it('renders correctly and calls onSearchChange when an option is selected', () => {
    const options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ];
    const onSearchChange = jest.fn();
    const { getByRole, getByText } = render(
      <Combobox name='test' options={options} onSearchChange={onSearchChange} />
    );

    // Check that the combobox is in the document
    const combobox = getByRole('combobox');
    expect(combobox).toBeInTheDocument();

    // Simulate clicking on the combobox and selecting an option
    fireEvent.click(combobox);
    const option = getByText('Option 1');
    fireEvent.click(option);

    // Check that onSearchChange was called with the value of the selected option
    expect(onSearchChange).toHaveBeenCalledWith('1');
  });
});