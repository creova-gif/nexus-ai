import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Router } from 'wouter';
import { memoryLocation } from 'wouter/memory-location';
import App from '../app/App';

function renderAt(path: string) {
  const { hook } = memoryLocation({ path, static: true });
  return render(
    <Router hook={hook}>
      <App />
    </Router>
  );
}

const routes: [string][] = [
  ['/'],
  ['/tour'],
  ['/dashboard'],
  ['/compliance'],
  ['/alerts'],
  ['/network'],
  ['/kyc'],
  ['/sanctions'],
  ['/sar'],
  ['/advisory'],
  ['/openbanking'],
  ['/audit'],
  ['/admin'],
  ['/cases'],
  ['/supervisor'],
  ['/rules'],
  ['/risk-profile'],
  ['/screening'],
  ['/ubo'],
  ['/reporting'],
  ['/agent'],
  ['/crypto-graph'],
  ['/federated'],
  ['/deepfake'],
  ['/comms'],
  ['/workflow-builder'],
  ['/qa-checker'],
];

describe('Route smoke tests: every route loads past the lazy-load fallback', () => {
  for (const [path] of routes) {
    it(`renders ${path}`, async () => {
      const { container } = renderAt(path);
      await waitFor(() => expect(screen.queryByText('Loading…')).not.toBeInTheDocument());
      expect(container.textContent?.length ?? 0).toBeGreaterThan(50);
    });
  }
});

describe('Every page exposes at least one heading', () => {
  for (const [path] of routes) {
    it(`has a heading at ${path}`, async () => {
      renderAt(path);
      await waitFor(() => expect(screen.queryByText('Loading…')).not.toBeInTheDocument());
      expect(screen.getAllByRole('heading').length).toBeGreaterThan(0);
    });
  }
});

describe('404 fallback', () => {
  it('shows 404 for unknown route', () => {
    renderAt('/does-not-exist');
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
