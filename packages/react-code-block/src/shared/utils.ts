import { useContext, forwardRef as reactForwardRef, type CSSProperties } from 'react';
import type { ThemedToken } from 'shiki';
import type { BaseContextProps } from './types.js';

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
  highlights: BaseContextProps['words']
) => {
  return highlights.some(
    ([highlightWord, [min, max]]) =>
      highlightWord === word && min <= line && line <= max
  );
};

export const splitStringByWords = (
  str: string,
  words: BaseContextProps['words']
) => {
  return str
    .split(new RegExp(`(${words.map(([word]) => word).join('|')})`))
    .filter(Boolean);
};

export const parseWordHighlights = (
  words: string[]
): BaseContextProps['words'] => {
  return words.map((word) => {
    word = word.startsWith('/') ? word : '/' + word;

    const [, highlightWord, highlightRange = '0:Infinity'] = word.split('/');
    const [min, max = min]: number[] = highlightRange
      .split(':')
      .map((val) => Number(val));

    return [highlightWord, [min, max]];
  });
};

export const fontStyleToCss = (token: ThemedToken) => {
  const fontStyles: CSSProperties = {};
  if (!token.fontStyle || token.fontStyle === -1) return fontStyles;


  if (token.fontStyle & 1) {
    fontStyles.fontStyle = 'italic';
  }
  if (token.fontStyle & 2) {
    fontStyles.fontWeight = 'bold';
  }
  if (token.fontStyle & 4) {
    fontStyles.textDecoration = `${fontStyles.textDecoration ?? ''} underline`.trim();
  }
  if (token.fontStyle & 8) {
    fontStyles.textDecoration = `${fontStyles.textDecoration ?? ''} line-through`.trim();
  }

  return fontStyles;
}

export const createUseContext =
  <T>(context: React.Context<T | undefined>, errMessage: string) =>
  () => {
    const ctx = useContext(context);
    if (ctx === undefined) {
      throw new Error(errMessage);
    }
    return ctx;
  };

export const forwardRef = <T extends { name: string; displayName?: string }>(
  component: T
): T & { displayName: string } => {
  return Object.assign(reactForwardRef(component as any) as any, {
    displayName: component.displayName ?? component.name,
  });
};
