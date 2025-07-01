import type { Reroute } from '@sveltejs/kit';

const aliases: Record<string, string> = {
  '/schedule': '/program/outline'
};

export const reroute: Reroute = ({ url }) => {
  if (url.pathname in aliases || `${url.pathname}/` in aliases) {
    return aliases[url.pathname];
  }
};
