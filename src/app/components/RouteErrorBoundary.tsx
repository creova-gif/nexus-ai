import { Component, type ReactNode } from "react";

interface State {
  failed: boolean;
}

export default class RouteErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div role="alert" className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-3 text-white">This page failed to load</h1>
          <p className="mb-4 text-[var(--text-purple-2)]">Check your connection and try again.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-md border border-white/20 px-4 py-2 text-sm text-white"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }
}
