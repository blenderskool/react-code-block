import { RootContextProps } from './types.js';

export const shouldHighlightLine = (
  line: number,
  highlights: (number | string)[]
) => {
  return highlights.some((highlight) => {
    if (typeof highlight === 'number') {
      return line === highlight;
    }

    const [min, max] = highlight.split(':').map((val) => parseInt(val));
    return min <= line && line <= max;
  });
};

export const shouldHighlightToken = (
  word: string,
  line: number,
  highlights: RootContextProps['words']
) => {
  return highlights.some(
    ([highlightWord, [min, max]]) =>
      highlightWord === word && min <= line && line <= max
  );
};

export const parseWordHighlights = (
  words: string[]
): RootContextProps['words'] => {
  return words.map((word) => {
    word = word.startsWith('/') ? word : '/' + word;

    const [, highlightWord, highlightRange = '0:Infinity'] = word.split('/');
    const [min, max = min]: number[] = highlightRange
      .split(':')
      .map((val) => Number(val));

    return [highlightWord, [min, max]];
  });
};
