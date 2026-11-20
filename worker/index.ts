import { academyWaitlist, type AcademyBindings } from './academy-waitlist.ts';

type Env = Cloudflare.Env & AcademyBindings;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/contact') {
      if (request.method !== 'POST') {
        return new Response(null, {
          status: 405,
          headers: { Allow: 'POST', 'Cache-Control': 'no-store' },
        });
      }

      return Response.json(
        { error: 'contact_disabled' },
        {
          status: 503,
          headers: { 'Cache-Control': 'no-store' },
        },
      );
    }

    if (pathname === '/api/academy-waitlist')
      return academyWaitlist(request, env);

    if (pathname === '/api' || pathname.startsWith('/api/')) {
      return Response.json(
        { error: 'not_found' },
        {
          status: 404,
          headers: { 'Cache-Control': 'no-store' },
        },
      );
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
