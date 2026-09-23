/**
 * ----------------------------------------------------------
 * QUEVY UI
 * ----------------------------------------------------------
 * Motion tokens.
 *
 * Defines consistent durations and easing curves used by
 * Quevy UI interactions and transitions.
 * ----------------------------------------------------------
 */

export const motion = {
  // Not a flat +100ms ladder - each step's *absolute* jump grows
  // (60, 60, 80, 100) while its *relative* growth eases off
  // (1.5x, 1.33x, 1.33x, 1.31x). Longer motion needs a bigger
  // absolute gap to still read as "a different speed," so the
  // scale is tuned per tier's job below, not derived by formula.
  duration: {
    instant: '0ms',       // reduced-motion fallback / no-op
    fast: '120ms',        // micro-interactions: hover/focus color, border, icon swap
    normal: '180ms',      // default control-level transition
    moderate: '240ms',    // tactile toggles - pairs with `spring` (ink-fill, thumb, dot)
    slow: '320ms',        // panel/overlay entrances: dropdown, menu, modal, toast
    slower: '420ms',      // large-surface motion: bottom sheet slide, full backdrop
  },

  // Custom easing family - every curve below is deliberately
  // designed, not a browser keyword (`ease`, `ease-in-out`, ....),
  // so motionreads as one consistent, consider feel everywhere
  // it's used rather than a patchwork of defaults.
  easing: {
    // In-place property changes: hover/focus color, background,
    // border, boxx-shadow, Smooth, quick, gets out of the way.
    standard: 'cubic-bezier(0.2, 0, 0, 1)',

    // Panels/overlays/toast showing and hiding. `enter` and
    // `exit` are point-reflections of each other through the
    // curve's center, so they read as two halves of one motion
    // rather than unrelated curves: `enter` decelerates hard
    // into place (smooth arrival), `exit` mirrors that same
    // shape but accelerate away (quick, doesn't linger).
    enter: 'cubic-bezier(0.16, 1, 0.3, 1)',
    exit: 'cubic-bezier(0.7, 0, 0.84, 0)',

    // Small toggles that should feel tactile/alive rather than
    // mechanical - a switch thumb sliding, a radio dot popping
    // in, a checkbox's ink-fill, Overshoots slightly past 100%
    // before setting (y > 1 mid-curve), like soft spring.
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',

    // Large-surface entrances - the one thing in the library that
    // move a lot of visual area at once (bottom sheet's full
    // slide-up). Declarates harder and lingers longer at the end
    // than `enter`, so something this size reads as "weighted"
    // rather than just a slower version of the same panel motion.
    // Pairs with `duration.slower`
    emphasized: 'cubic-bezier(0.05, 0.7, 0.1, 1)',

    // Continous constant-speed motion that never starts or
    // stop - a spinner's full rotation, a shimer sweep. Any
    // eased curve would visibly speed up/slow down every loop,
    // is the *correct* choice here, not a fallback default - so
    // it gets a name instead of staying a stray bare keyword.
    linaer: 'linear',

    // Symentric breathing motion that repeats forever - skeleton
    // pulse/shimmer, an indeterminate progress bar, anything that
    // eases out then back in on a loop. Rounder and less mechanical
    // than the browser's `ease-in-out` (a sine-like curve, not the
    // default's sharper middle), so an infinite loop feels like
    // one continous breath instead of a repeating snap-and-settle.
    loop: 'cubic-bezier(0.37, 0, 0.63, 1',
    },
} as const;