import type {
  SequenceName,
  SequenceOptions,
  SequencePlayback,
} from './sequence';

type Pattern = (
  root: HTMLElement,
  options?: SequenceOptions,
) => SequencePlayback;

export const patterns: Record<SequenceName, () => Promise<Pattern>> = {
  kinetic: () =>
    import('./kinetic').then(({ immersiveEntrance }) => immersiveEntrance),
  assembly: () =>
    import('./assembly').then(({ layeredAssembly }) => layeredAssembly),
  metrics: () => import('./metrics').then(({ rollingDigits }) => rollingDigits),
  narrative: () =>
    import('./narrative').then(({ narrativeFlow }) => narrativeFlow),
  organic: () =>
    import('./organic-reveal').then(({ organicReveal }) => organicReveal),
  landscape: () =>
    import('./organic-reveal').then(
      ({ organicReveal }) =>
        (root, options) =>
          organicReveal(root, options, 'landscape'),
    ),
  convergence: () =>
    import('./convergence').then(
      ({ compositionalConvergence }) => compositionalConvergence,
    ),
  signal: () =>
    import('./signal').then(({ initiativeSignal }) => initiativeSignal),
  trace: () =>
    import('./signal').then(
      ({ initiativeSignal }) =>
        (root, options) =>
          initiativeSignal(root, options, 'trace'),
    ),
};
