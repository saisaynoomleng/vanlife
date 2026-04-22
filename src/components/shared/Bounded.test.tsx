import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Bounded from './Bounded';

describe('Bounded', () => {
  it('renders children correctly', () => {
    render(
      <Bounded>
        <div>Test Content</div>
      </Bounded>,
    );

    expect(screen.getByText('Test Content')).toHaveTextContent('Test Content');
  });

  it('should add padding', () => {
    render(
      <Bounded isPadded>
        <div>Test Content</div>
      </Bounded>,
    );

    const element = screen.getByText('Test Content').parentElement;

    expect(element).toHaveClass('px-5');
  });

  it('should have default classes', () => {
    render(
      <Bounded>
        <div>Test Content</div>
      </Bounded>,
    );

    const element = screen.getByText('Test Content').parentElement;

    expect(element).toHaveClass('space-y-5 ');
    expect(element).toHaveClass('lg:space-y-12');
    expect(element).toHaveClass('md:space-y-8 ');
  });

  it('should not have padding class when isPadded is false', () => {
    render(
      <Bounded isPadded={false}>
        <div>Test Content</div>
      </Bounded>,
    );

    const element = screen.getByText('Test Content').parentElement;

    expect(element).not.toHaveClass('px-5');
  });

  it('should render as different element', () => {
    render(
      <Bounded as={'main'}>
        <div>Test Content</div>
      </Bounded>,
    );

    const element = screen.getByText('Test Content').parentElement;

    expect(element?.tagName).toBe('MAIN');
  });
});
