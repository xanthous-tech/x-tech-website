# Xanthous Tech website

A fresh Next.js + Fumadocs documentation site for Xanthous Tech LLC. Content is plain Markdown in `content/docs`; Fumadocs supplies the responsive sidebar, table of contents, search, and theme switch.

## Development

Use Node.js 22+ and pnpm 10.33.2.

```sh
pnpm install
pnpm dev
```

The default URL is http://localhost:3000. To use another port: `pnpm dev --port 3100`.

```sh
pnpm lint
pnpm types:check
pnpm build
```

TypeScript is pinned to 6.0.3 because the starter’s ESLint parser currently supports TypeScript <6.1.0.

## Pages

| Route | Content |
| --- | --- |
| `/` | Company introduction |
| `/apps` | Apps directory |
| `/apps/ringsizer` | Ring Sizer's App Store description |
| `/apps/ringsizer/support` | Getting started, FAQ, and email support |
| `/apps/ringsizer/privacy` | Ring Sizer privacy policy |
| `/apps/ringsizer/terms` | Link to Apple's standard EULA |
| `/history` | Rewritten company milestones from the previous site |

## Adding another app

Create `content/docs/apps/<slug>/index.md`, `support.md`, `privacy.md`, and `terms.md` as needed. Add a `meta.json` with a readable title and page order, include the folder in `content/docs/apps/meta.json`, and add the app to the `/apps` directory page. Page URLs, navigation, search, metadata, social previews, and sitemap entries are derived from the content source.

Keep legal policies specific to the app. Do not copy Ring Sizer's on-device processing claims into a different app without checking its behavior.

## Fumadocs conventions

Bootstrapped separately with the official `create-fumadocs-app` Next.js/MDX template, then used to replace the old implementation. Uses the current Fumadocs MDX macro source, `loader()`, standard `DocsLayout` and `DocsPage`, shared MDX components, relative document links, and the built-in search route. Pages are prerendered with `generateStaticParams`; unknown documents return 404. Content stays in Server Components.

- [Fumadocs CLI](https://www.fumadocs.dev/docs/cli/create-fumadocs-app)
- [Page conventions](https://www.fumadocs.dev/docs/page-conventions)
- [Docs layout](https://www.fumadocs.dev/docs/ui/layouts/docs)
- [Fumadocs MDX](https://www.fumadocs.dev/docs/mdx)

## Migration and release

The previous Next.js 13/Tailwind UI implementation is preserved in Git at `ce624a2`. Its styles, components, assets, dependencies, and custom MDX pipeline are not carried into this project. The seven company milestones and company introduction were rewritten as Markdown in `/history` and `/`. Commented-out template demo posts were excluded.

Ring Sizer's description and privacy text come from `ring-sizer-app` release preparation at `4a28807`; the App Store description's wording is retained with Markdown headings.

Deploy with the standard Next.js build (`pnpm build`) and runtime (`pnpm start`), or a Next.js hosting integration. No application environment variables or external content services are required. The canonical site origin is defined in `src/lib/shared.ts`.

After deployment, verify `/apps/ringsizer`, `/apps/ringsizer/support`, and `/apps/ringsizer/privacy` publicly before adding the policy URL and submitting the iOS app. The existing App Store support URL points to the app overview, which links directly to support. This PR does not change the live website or App Store submission.
