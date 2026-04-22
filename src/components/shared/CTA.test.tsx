import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CTA from './CTA';

describe('CTA', () => {
  it('should renders correctly', () => {
    render(<CTA href="/vans">All Vans</CTA>);

    const el = screen.getByRole('link', { name: /all vans/i });

    expect(el).toBeInTheDocument();
    expect(el?.tagName).toBe('A');
  });

  it('should have requried props', () => {
    render(<CTA href="/vans">All Vans</CTA>);

    const el = screen.getByRole('link', { name: /all vans/i });

    expect(el).toHaveAttribute('href', '/vans');
  });

  it('should have base classes', () => {
    render(
      <CTA href="/vans" className="bg-white">
        All Vans
      </CTA>,
    );

    const el = screen.getByRole('link', { name: /all vans/i });

    expect(el).toHaveClass('font-semibold text-center rounded-sm');
    expect(el).toHaveClass('bg-white');
  });
});
