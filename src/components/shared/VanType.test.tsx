import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import VanType from './VanType';

describe('Van Type', () => {
  it('should render correctly', () => {
    render(<VanType type="simple">simple</VanType>);

    const el = screen.getByText('simple').closest('div');

    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent('simple');
    expect(el).toHaveClass('rounded-sm px-2 py-1');
  });

  it.each<['simple' | 'rugged' | 'luxury', string]>([
    ['simple', '#e17654'],
    ['rugged', '#115e59'],
    ['luxury', '#161616'],
  ])('type %s should have color %s', async (type, color) => {
    render(<VanType type={type}>{type}</VanType>);

    const el = screen.getByTestId('van-type');

    expect(el).not.toBeNull();
    expect(el).toHaveStyle({ backgroundColor: color });
  });
});
