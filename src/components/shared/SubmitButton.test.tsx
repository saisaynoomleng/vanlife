import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SubmitButton from './SubmitButton';

describe('Submit Button', () => {
  it('should render correctly', async () => {
    render(<SubmitButton>submit</SubmitButton>);

    const el = screen.getByRole('button', { name: /submit/i });

    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent('submit');
  });
});
