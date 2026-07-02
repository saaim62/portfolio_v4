import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../Navbar';

// Mock next/link to prevent actual routing during tests
jest.mock('next/link', () => {
  return ({ children, href, ...props }: { children: React.ReactNode; href: string } & Record<string, unknown>) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

describe('Navbar', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders the portfolio logo/name correctly using exact CV data', () => {
    render(<Navbar />);
    expect(screen.getByText('Saim Asif')).toBeInTheDocument();
  });

  it('renders all core navigation links for the portfolio sections', () => {
    render(<Navbar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('links point to the correct routes for each section', () => {
    render(<Navbar />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About Me' });
    const projectsLink = screen.getByRole('link', { name: 'Projects' });
    const contactLink = screen.getByRole('link', { name: 'Contact' });

    expect(homeLink).toHaveAttribute('href', '/');
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(projectsLink).toHaveAttribute('href', '/projects');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('toggles mobile navigation menu when the hamburger button is clicked', () => {
    render(<Navbar />);
    const toggleButton = screen.getByRole('button', { name: /toggle navigation/i });
    
    // Initially collapsed
    expect(screen.queryByRole('navigation')).not.toHaveAttribute('aria-expanded', 'true');
    
    // Click to expand
    fireEvent.click(toggleButton);
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-expanded', 'true');
    
    // Click again to collapse
    fireEvent.click(toggleButton);
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-expanded', 'false');
  });

  it('applies dark mode styling class when the theme toggle is activated', () => {
    render(<Navbar />);
    const themeToggle = screen.getByRole('button', { name: /toggle dark mode/i });
    
    expect(document.documentElement).not.toHaveClass('dark');
    
    fireEvent.click(themeToggle);
    expect(document.documentElement).toHaveClass('dark');
  });
});