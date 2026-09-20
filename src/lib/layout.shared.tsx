import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import logo from '@/app/icon.png';
import { appName } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image
            src={logo}
            alt=""
            className="h-8 w-auto shrink-0"
            unoptimized
          />
          {appName}
        </>
      ),
      url: '/',
    },
    githubUrl: 'https://github.com/xanthous-tech',
  };
}
