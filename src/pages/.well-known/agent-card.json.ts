import type { APIRoute } from 'astro';
import { buildAgentCard } from '../../lib/agentCard';

// PRIMARY A2A discovery endpoint (A2A v1.0): /.well-known/agent-card.json
// `site` is read from astro.config at build time. See agent.json.ts for the
// backward-compat alias.
export const GET: APIRoute = ({ site }) => {
  const baseUrl = site?.toString().replace(/\/$/, '') ?? 'https://cdat.sdet.it';
  const card = buildAgentCard(baseUrl);

  return new Response(JSON.stringify(card, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // Discovery manifests are read by crawlers/agents; cache so a fetch spike
      // does not regenerate per request. Content only changes at build.
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
