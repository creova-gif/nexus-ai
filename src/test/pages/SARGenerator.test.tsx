import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Router } from 'wouter';
import { memoryLocation } from 'wouter/memory-location';
import SARGenerator from '../../app/pages/SARGenerator';

function renderPage() {
  const { hook } = memoryLocation({ path: '/sar', static: true });
  return render(<Router hook={hook}><SARGenerator /></Router>);
}

describe('SARGenerator', () => {
  it('renders without crashing', () => {
    const { container } = renderPage();
    expect(container.firstChild).not.toBeNull();
  });

  it('shows SAR heading', () => {
    renderPage();
    expect(screen.getAllByText(/SAR/i).length).toBeGreaterThan(0);
  });

  it('shows the prototype notice instead of a filing claim', () => {
    renderPage();
    expect(screen.getAllByText(/Prototype – illustrative data, not a real customer or certification/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/FINTRAC/i)).not.toBeInTheDocument();
  });

  it('shows status indicators', () => {
    renderPage();
    expect(screen.getAllByText(/Draft|Pending|Filed|Submitted/i).length).toBeGreaterThan(0);
  });
});
