import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavBar } from './NavBar';
import { navItems } from '../../config/navBar';

// Mocking useLocation hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('NavBar Component', () => {
  const useLocationMock = jest.spyOn(require('react-router-dom'), 'useLocation');

  beforeEach(() => {
    useLocationMock.mockReturnValue({ pathname: '/' });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders NavBar component', () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );

    navItems.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  test('applies active class to the current route', () => {
    useLocationMock.mockReturnValue({ pathname: navItems[0].path });
  
    render(
      <Router>
        <NavBar />
      </Router>
    );
  
    navItems.forEach(item => {
      const linkElement = screen.getByText(item.label);
      if (item.path === navItems[0].path) {
        if (!linkElement.classList.contains('active')) {
          throw new Error(`Expected link element to have class 'active', but it does not.`);
        }
      } else {
        if (linkElement.classList.contains('active')) {
          throw new Error(`Expected link element not to have class 'active', but it does.`);
        }
      }
    });
  });
  
  test('does not apply active class to other routes', () => {
    useLocationMock.mockReturnValue({ pathname: navItems[1].path });
  
    render(
      <Router>
        <NavBar />
      </Router>
    );
  
    navItems.forEach(item => {
      const linkElement = screen.getByText(item.label);
      if (item.path === navItems[1].path) {
        if (!linkElement.classList.contains('active')) {
          throw new Error(`Expected link element to have class 'active', but it does not.`);
        }
      } else {
        if (linkElement.classList.contains('active')) {
          throw new Error(`Expected link element not to have class 'active', but it does.`);
        }
      }
    });
  });
});
