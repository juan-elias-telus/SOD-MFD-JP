import { render, screen, fireEvent } from '@testing-library/react';
import TodoItems from '../TodoItems'

const updateItem = jest.fn();

describe('TodoItems', () => {
  it('should render TodoItems with no data', () => {
    const { baseElement } = render(<TodoItems items={[]} updateItem={updateItem} />);

    expect(baseElement).toBeTruthy();
  })
  
  it('should render data', () => {
    const { baseElement } = render(<TodoItems items={[
      {
        id: 1234567,
        description: "SOD - Interview",
        status: false,
      }, 
    ]} updateItem={updateItem} />);

    expect(baseElement).toBeTruthy();
    expect(updateItem).not.toHaveBeenCalled();
    expect(screen.queryByText('SOD - Interview')).toBeTruthy();
  })
  
  it('should click on checkbox', () => {
    const { baseElement } = render(<TodoItems items={[
      {
        id: 1234567,
        description: "SOD - Interview",
        status: false,
      }, 
    ]} updateItem={updateItem} />);

    expect(baseElement).toBeTruthy();
    expect(updateItem).not.toHaveBeenCalled();
    const check = screen.getByTestId('check-SOD - Interview');
    fireEvent.click(check)
    expect(updateItem).toHaveBeenCalled();
  })
})
