import { academyWaitlist, type AcademyBindings } from './academy-waitlist.ts';
import {
  organizationContact,
  type ContactBindings,
} from './organization-contact.ts';

type Env = Cloudflare.Env & AcademyBindings & ContactBindings;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/contact') return organizationContact(request, env);

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
