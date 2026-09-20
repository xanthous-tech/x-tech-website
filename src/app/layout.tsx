import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { appName, siteUrl } from '@/lib/shared';
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: appName, template: `%s | ${appName}` },
  description: 'Apps, support, and product information from Xanthous Tech LLC.',
  openGraph: { siteName: appName, type: 'website', locale: 'en_US' },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
