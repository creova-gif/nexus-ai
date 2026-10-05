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

type Marker = { heading: string } | { text: RegExp };

// Route-specific content: DashboardLayout pages assert their exact h1 title;
// the two standalone pages assert stable copy their own tests already rely on.
const routes: [string, Marker][] = [
  ['/', { text: /The AI Platform/i }],
  ['/tour', { text: /INTERACTIVE PRODUCT TOUR/i }],
  ['/dashboard', { heading: 'Compliance Overview' }],
  ['/compliance', { heading: 'Compliance Overview' }],
  ['/alerts', { heading: 'AML Alerts' }],
  ['/network', { heading: 'Entity Network Graph' }],
  ['/kyc', { heading: 'KYC Onboarding' }],
  ['/sanctions', { heading: 'Sanctions Screening' }],
  ['/sar', { heading: 'SAR Generator' }],
  ['/advisory', { heading: 'Financial Advisory' }],
  ['/openbanking', { heading: 'Open Banking' }],
  ['/audit', { heading: 'Audit Trail' }],
  ['/admin', { heading: 'System Health' }],
  ['/cases', { heading: 'Case Management' }],
  ['/supervisor', { heading: 'Supervisor Queue' }],
  ['/rules', { heading: 'Rules Engine' }],
  ['/risk-profile', { heading: 'Risk Profile' }],
  ['/screening', { heading: 'Adverse Media & Screening' }],
  ['/ubo', { heading: 'UBO Discovery' }],
  ['/reporting', { heading: 'Regulatory Reporting Hub' }],
  ['/agent', { heading: 'Agentic Investigator' }],
  ['/crypto-graph', { heading: 'Fiat-to-Crypto Forensics' }],
  ['/federated', { heading: 'Federated Learning Network' }],
  ['/deepfake', { heading: 'Deepfake & Synthetic ID Detection' }],
  ['/comms', { heading: 'Communication Hub' }],
  ['/workflow-builder', { heading: 'Workflow Builder' }],
  ['/qa-checker', { heading: 'Maker-Checker QA' }],
];

describe('Route smoke tests: each route renders its own page', () => {
  for (const [path, marker] of routes) {
    it(`renders the expected page at ${path}`, async () => {
      renderAt(path);
      await waitFor(() => expect(screen.queryByText('Loading…')).not.toBeInTheDocument());
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      if ('heading' in marker) {
        expect(screen.getByRole('heading', { level: 1, name: marker.heading })).toBeInTheDocument();
      } else {
        expect(screen.getAllByText(marker.text).length).toBeGreaterThan(0);
      }
    });
  }
});

describe('404 fallback', () => {
  it('shows 404 for unknown route', () => {
    renderAt('/does-not-exist');
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
