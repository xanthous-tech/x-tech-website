export const appName = 'Xanthous Tech';
export const siteUrl = 'https://x-tech.io';

export function getPageImageUrl(page: { slugs: string[] }) {
  const segments = [...page.slugs, 'image.png'];
  return { segments, url: `/og/docs/${segments.join('/')}` };
}
