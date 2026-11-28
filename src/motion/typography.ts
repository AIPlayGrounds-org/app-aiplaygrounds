/** Plain-text editorial headings only. Inline markup keeps its original shape. */
export function splitHeading(
  run: { disposal: (() => void)[] },
  heading: HTMLElement,
  by: 'lines' | 'words',
) {
  if (heading.childElementCount) return by === 'lines' ? [heading] : [];
  const original = [...heading.childNodes];
  const text = heading.textContent ?? '';
  const fragment = document.createDocumentFragment();
  const accessible = document.createElement('span');
  accessible.className = 'sr-only';
  accessible.textContent = text;
  fragment.append(accessible);
  const visual = document.createElement('span');
  visual.setAttribute('aria-hidden', 'true');
  fragment.append(visual);
  const words: HTMLElement[] = [];
  for (const part of text.split(/(\s+)/)) {
    if (!part.trim()) {
      visual.append(part);
      continue;
    }
    const word = document.createElement('span');
    word.dataset.word = '';
    word.textContent = part;
    visual.append(word);
    words.push(word);
  }
  run.disposal.push(() => heading.replaceChildren(...original));
  heading.replaceChildren(fragment);
  if (by === 'words' || !words.length) return words;

  // All reads precede line construction. Whitespace remains in the word flow.
  const groups = Map.groupBy(words, (word) => word.offsetTop);
  return [...groups.values()].map((lineWords) => {
    const line = document.createElement('span');
    line.className = 'motion-heading-line';
    const range = document.createRange();
    range.setStartBefore(lineWords[0]);
    range.setEndAfter(lineWords[lineWords.length - 1]);
    // Line reveals do not need individual word boxes after measuring.
    line.textContent = range.toString();
    range.deleteContents();
    range.insertNode(line);
    return line;
  });
}
