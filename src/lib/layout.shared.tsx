import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: { title: appName, url: '/' },
    githubUrl: 'https://github.com/xanthous-tech',
  };
}
