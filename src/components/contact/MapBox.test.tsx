import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MapBox from './MapBox';
import { mapAddress } from '../../config/ContactData';

describe('MapBox component', () => {
  test('renders the iframe with the correct attributes', () => {
    render(<MapBox />);

    const iframe = screen.getByTitle('map address');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', mapAddress);
    expect(iframe).toHaveAttribute('width', '400');
    expect(iframe).toHaveAttribute('height', '300');
    expect(iframe).toHaveAttribute('loading', 'lazy');
  });

  test('has the correct data attribute and class name', () => {
    render(<MapBox />);

    const section = screen.getByTestId('mapbox-section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('data-mapbox', 'true');
    expect(section).toHaveClass('mapbox');
  });
});
