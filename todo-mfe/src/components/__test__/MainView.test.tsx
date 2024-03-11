import React from 'react'
import { render, screen } from '@testing-library/react';
import MainView from '../MainView'

describe('MainView', () => {
  it('should render MainView', () => {
    const { baseElement } = render(<MainView title="TODO" />);

    expect(baseElement).toBeTruthy();
    expect(screen.queryByText('TODO')).toBeTruthy();
  })
  
  it('should render without data', () => {
    const { baseElement } = render(<MainView title="TODO" />);

    expect(baseElement).toBeTruthy();
    expect(screen.queryByText('TODO')).toBeTruthy();
    expect(screen.queryByText('No data')).toBeTruthy();
  })
})
