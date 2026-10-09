'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from 'react';

/**
 * A horizontal strip of slides (usually app screenshots) that scrolls by
 * swipe, trackpad, mouse drag, keyboard, or the arrow buttons.
 *
 * ```mdx
 * <Carousel label="Formz screenshots">
 *   <img src="/apps/formz/screenshots/01.webp" alt="…" width={240} height={427} />
 * </Carousel>
 * ```
 */
export function Carousel({
  children,
  label = 'Screenshots',
}: {
  children: ReactNode;
  label?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 1,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
    });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [update]);

  const page = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  // Touch and trackpads scroll natively; a mouse drags. Snapping is paused
  // while dragging so the strip follows the pointer, then snaps on release.
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const el = track.current;
    if (!el || event.pointerType !== 'mouse' || event.button !== 0) return;
    drag.current = { x: event.clientX, left: el.scrollLeft, moved: false };
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = track.current;
    const state = drag.current;
    if (!el || !state) return;
    const dx = event.clientX - state.x;
    if (!state.moved && Math.abs(dx) < 4) return;
    if (!state.moved) {
      state.moved = true;
      el.setPointerCapture(event.pointerId);
      el.style.scrollSnapType = 'none';
      el.style.cursor = 'grabbing';
    }
    el.scrollLeft = state.left - dx;
  };
  const endDrag = () => {
    const el = track.current;
    const state = drag.current;
    drag.current = null;
    if (!el || !state?.moved) return;
    el.style.cursor = '';
    // Restore snapping from where the drag ended, then settle smoothly.
    const left = el.scrollLeft;
    el.style.scrollSnapType = '';
    el.scrollLeft = left;
    const slides = Array.from(el.children) as HTMLElement[];
    const nearest = slides.reduce((best, slide) =>
      Math.abs(slide.offsetLeft - left) < Math.abs(best.offsetLeft - left) ? slide : best,
    );
    el.scrollTo({ left: nearest.offsetLeft, behavior: 'smooth' });
  };

  const fade = `${edges.start ? '' : 'transparent 0, black 48px'}${edges.start || edges.end ? '' : ', '}${edges.end ? '' : 'black calc(100% - 48px), transparent 100%'}`;

  return (
    <div className="not-prose group relative my-6" role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={track}
        tabIndex={0}
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDragStart={(event) => event.preventDefault()}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') page(1);
          else if (event.key === 'ArrowLeft') page(-1);
          else return;
          event.preventDefault();
        }}
        style={fade ? { maskImage: `linear-gradient(to right, ${fade})` } : undefined}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain rounded-xl [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fd-primary md:cursor-grab [&::-webkit-scrollbar]:hidden"
      >
        {Children.map(children, (child) => (
          <div className="shrink-0 snap-start [&_img]:m-0 [&_img]:block [&_img]:rounded-xl [&_img]:select-none">
            {child}
          </div>
        ))}
      </div>
      <ArrowButton side="left" hidden={edges.start} onClick={() => page(-1)} />
      <ArrowButton side="right" hidden={edges.end} onClick={() => page(1)} />
    </div>
  );
}

function ArrowButton({
  side,
  hidden,
  onClick,
}: {
  side: 'left' | 'right';
  hidden: boolean;
  onClick: () => void;
}) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      tabIndex={-1}
      aria-hidden={hidden}
      aria-label={side === 'left' ? 'Previous' : 'Next'}
      onClick={onClick}
      className={`absolute top-1/2 ${side === 'left' ? 'left-2' : 'right-2'} flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-fd-border bg-fd-background/90 text-fd-foreground shadow-md backdrop-blur transition-opacity hover:bg-fd-accent ${hidden ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
    >
      <Icon className="size-5" />
    </button>
  );
}
