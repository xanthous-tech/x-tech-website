import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-4 px-6">
      <p className="text-sm text-fd-muted-foreground">404</p>
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p>This page may have moved. Browse our apps or return home.</p>
      <div className="flex gap-5 underline"><Link href="/">Home</Link><Link href="/apps">Apps</Link></div>
    </main>
  );
}
