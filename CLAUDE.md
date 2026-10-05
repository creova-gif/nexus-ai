# CLAUDE.md — nexus-ai

## Project Overview
AI product, Vite-based.

## Technology Stack
React, Vite, TypeScript, Vitest.

## CI
`npm ci && npm run test && npm run build` — this is one of the few repos in the portfolio with real automated test coverage already wired into CI. Preserve and extend this rather than letting it lapse.

## AI Agent Rules
- New features should include Vitest coverage, matching the existing pattern — this repo is ahead of most of the portfolio on this front; don't regress it.
- This repo has not had a deep security/architecture audit in this engagement (a "prompt safety" risk was flagged by an earlier report but never independently verified) — verify directly if working on AI-output-handling code rather than assuming either way.

## Definition of Done
`npm run test` and `npm run build` both pass. New logic has real test coverage.
