import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ToolVista - Free Data Visualization & Productivity Suite',
    short_name: 'ToolVista',
    description: 'Free, secure, 100% offline data visualizer and productivity toolkit.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0c0e12',
    theme_color: '#0c0e12',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
