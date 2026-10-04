import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RouteErrorBoundary from '../app/components/RouteErrorBoundary';

function Boom(): never {
  throw new Error('chunk failed');
}

describe('RouteErrorBoundary', () => {
  it('renders children when nothing throws', () => {
    render(<RouteErrorBoundary><p>ok</p></RouteErrorBoundary>);
    expect(screen.getByText('ok')).toBeInTheDocument();
  });

  it('shows a reload prompt when a child throws', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<RouteErrorBoundary><Boom /></RouteErrorBoundary>);
    expect(screen.getByRole('alert')).toHaveTextContent(/failed to load/i);
    expect(screen.getByRole('button', { name: /reload/i })).toBeInTheDocument();
    spy.mockRestore();
  });
});
