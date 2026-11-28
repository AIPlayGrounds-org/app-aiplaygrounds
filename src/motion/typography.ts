import { splitText } from 'animejs/text';
import type { Sequence } from './sequence';

/** Split only noninteractive headings; keep the original accessible name. */
export function splitHeading(
  run: Sequence,
  heading: HTMLElement,
  by: 'lines' | 'words',
) {
  // Keep authored inline markup intact when a line spans more than one node.
  if (by === 'lines' && heading.childElementCount) return [heading];
  const split = splitText(heading, {
    lines: false,
    words: true,
    chars: false,
    accessible: true,
  });
  run.disposal.push(() => split.revert());
  const words: HTMLElement[] = split.words;
  if (by === 'words' || !words.length) return words;

  // Word splitting is synchronous and Anime.js labels each visual line.
  // Group those words now so this timeline owns the masks from its first frame.
  const lines = Map.groupBy(words, (word) => word.dataset.line);
  return [...lines.values()].map((lineWords) => {
    const line = document.createElement('span');
    line.className = 'motion-heading-line';
    line.setAttribute('aria-hidden', 'true');
    const range = document.createRange();
    range.setStartBefore(lineWords[0]);
    range.setEndAfter(lineWords[lineWords.length - 1]);
    range.surroundContents(line);
    return line;
  });
}
