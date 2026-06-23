import type { APIRoute } from 'astro';
import { buildAgentCard } from '../../lib/agentCard';

// BACKWARD-COMPAT alias: /.well-known/agent.json
//
// A2A v1.0 moved the official path to /.well-known/agent-card.json. The older
// /.well-known/agent.json is still read by parts of the ecosystem (Google ADK
// and tooling shipped against the earlier draft), so serve the identical card
// here too. Same builder, two paths - nothing to keep in sync.
//
// Drop this file when you no longer need to support clients that only check
// the legacy path.
export const GET: APIRoute = ({ site }) => {
  const baseUrl = site?.toString().replace(/\/$/, '') ?? 'https://cdat.sdet.it';
  const card = buildAgentCard(baseUrl);

  return new Response(JSON.stringify(card, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
