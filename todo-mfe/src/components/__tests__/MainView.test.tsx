import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import MainView from '../MainView'
import TodoItem from '../../model/TodoItem';

jest.mock(
  'antd',
  () => ({
    ...jest.requireActual('antd'),
    Button: (props: any) => <button type="button" {...props} />,
  }),
  { virtual: true }
);

const mockDefaultData: TodoItem[] = [
  {
    id: 1234567,
    description: "SOD - Interview",
    status: false,
  },
  {
    id: 1234562,
    description: "SOD - Interview feedback",
    status: false,
  }
];

const mockValidate = jest.fn();

jest.mock(
  '../../utils/validatorHelpers.ts',
  () => ({
    throwRejected: () => { },
    checkInput: (_: any, value: string) => Promise.resolve(value),
    validator: (_func: () => Promise<any>) => mockValidate(),
  }),
  { virtual: true }
);

describe('MainView', () => {
  jest.useFakeTimers()
  jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
  Object.setPrototypeOf(window.localStorage.setItem, jest.fn())

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(cleanup);

  it('should render MainView', () => {
    const { baseElement } = render(<MainView />);
    expect(baseElement).toBeTruthy();
  })

  it('should render without data', () => {
    const { baseElement } = render(<MainView />);

    expect(window.localStorage.setItem).toHaveBeenCalledWith("todos", "[]");
    expect(baseElement).toBeTruthy();
    expect(screen.queryByText('No data')).toBeTruthy();
  })

  it('should clear all items', () => {
    const { baseElement } = render(<MainView defaultData={mockDefaultData} />);
    const button = screen.getByTestId('clear-btn');
    // Adding data
    fireEvent.click(button);
    expect(screen.queryByText('No data')).not.toBeTruthy();
    // Cleaning data
    fireEvent.click(button);
    expect(screen.queryByText('No data')).toBeTruthy();

    expect(window.localStorage.setItem).toHaveBeenCalledWith("todos", "[]");
    expect(baseElement).toBeTruthy();
  })

  it('should add new item', async () => {
    mockValidate.mockImplementation(() => Promise.resolve());
    const { baseElement } = render(<MainView />);
    const input = screen.getByPlaceholderText('Description')
    const button = screen.getByTestId('add-btn');

    expect(baseElement).toBeTruthy();
    expect(input).toBeInTheDocument()

    act(() => {
      fireEvent.change(input, {
        target: {
          value: "test1"
        }
      })
      fireEvent.click(button);
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(screen.getByText(/test1/i)).toBeInTheDocument();
    });
  })

  it('should throw error when adding a new item', async () => {
    render(<MainView />);
    act(() => {
      mockValidate.mockImplementation(() => Promise.reject(new Error(`Please check the "Description" field warnings`)));
      const input = screen.getByPlaceholderText('Description')
      const button = screen.getByTestId('add-btn');
      try {
        fireEvent.change(input, {
          target: {
            value: "!!!"
          }
        })
        fireEvent.click(button);
        jest.advanceTimersByTime(1000);
      } catch (error) {
        expect(error).toBe(`Please check the "Description" field warnings`)
        expect(window.localStorage.setItem).toHaveBeenCalledWith("todos", "[]");
      }
    });
  })

  it('should change new item state on click', async () => {
    mockValidate.mockImplementation(() => Promise.resolve());
    const { baseElement } = render(<MainView />);
    const input = screen.getByPlaceholderText('Description')
    const button = screen.getByTestId('add-btn');

    expect(baseElement).toBeTruthy();
    expect(input).toBeInTheDocument()

    act(() => {
      fireEvent.change(input, {
        target: {
          value: "test2"
        }
      })
      fireEvent.click(button);
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => {
      expect(screen.getByText(/test2/i)).toBeInTheDocument();
    });
    const checkbox = screen.getByTestId('check-test2') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    act(() => {
      fireEvent.click(checkbox);
    });
    expect(checkbox.checked).toBe(true);
  })

  it('should switch tab to Active and not find completed items', async () => {
    mockValidate.mockImplementation(() => Promise.resolve());
    const { baseElement } = render(<MainView />);

    expect(baseElement).toBeTruthy();
    expect(screen.getByText(/test2/i)).toBeInTheDocument();

    const tab = screen.getByText("Active");
    act(() => {
      fireEvent.click(tab);
    });
    expect(screen.queryByText(/test2/i)).not.toBeInTheDocument();
  })

  it('should throw error when trying to set localStorage', async () => {
    Storage.prototype.setItem = jest.fn(() => {
      throw new Error('A problem occurred while trying to access localStorage');
    });
    render(<MainView />);

    expect(screen.queryByText(/A problem occurred while trying to access localStorage/i)).toBeInTheDocument();
  })

  it('should throw error when trying to get localStorage', async () => {
    Storage.prototype.getItem = jest.fn(() => {
      throw new Error('A problem occurred while trying to access localStorage');
    });
    render(<MainView />);

    expect(screen.queryByText(/A problem occurred while trying to access localStorage/i)).toBeInTheDocument();
  })

})
