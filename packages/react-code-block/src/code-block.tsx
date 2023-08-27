import { Highlight, HighlightProps } from 'prism-react-renderer';
import React, { useMemo } from 'react';
import {
  LineContext,
  RootContext,
  useLineContext,
  useRootContext,
} from './contexts';
import { WithAsProp } from './types';
import {
  parseWordHighlights,
  shouldHighlightLine,
  shouldHighlightToken,
} from './utils';

export interface CodeBlockProps extends Omit<HighlightProps, 'children'> {
  lines?: (number | string)[];
  words?: string[];
  children: React.ReactNode;
}

export const CodeBlock = ({
  code,
  words = [],
  lines = [],
  children,
  ...props
}: CodeBlockProps) => {
  const parsedWords = useMemo(() => parseWordHighlights(words), [words]);

  return (
    <RootContext.Provider
      value={{ code: code.trim(), words: parsedWords, lines, ...props }}
    >
      {children}
    </RootContext.Provider>
  );
};

export type CodeProps<T extends React.ElementType> = WithAsProp<
  T,
  {
    children:
      | React.ReactNode
      | ((
          data: { isLineHighlighted: boolean; lineNumber: number },
          idx: number
        ) => React.ReactNode);
  }
>;

const Code = <T extends React.ElementType = 'pre'>({
  as,
  children,
  ...props
}: CodeProps<T>) => {
  const { lines, words, ...highlightProps } = useRootContext();

  const Tag = as ?? 'pre';

  return (
    <Highlight {...highlightProps}>
      {(highlight) => (
        <Tag {...props}>
          {highlight.tokens.map((line, i) => {
            const lineNumber = i + 1;
            const isLineHighlighted = shouldHighlightLine(lineNumber, lines);

            return (
              <LineContext.Provider
                value={{ highlight, line, lineNumber }}
                key={i}
              >
                {typeof children === 'function'
                  ? children({ isLineHighlighted, lineNumber }, i)
                  : children}
              </LineContext.Provider>
            );
          })}
        </Tag>
      )}
    </Highlight>
  );
};

export type LineContentProps<T extends React.ElementType> = WithAsProp<T, {}>;

const LineContent = <T extends React.ElementType = 'div'>({
  as,
  children,
  className,
  ...rest
}: LineContentProps<T>) => {
  const { highlight, line } = useLineContext();
  const { getLineProps } = highlight!;

  const Tag = as ?? 'div';
  return (
    <Tag {...getLineProps({ line, className })} {...rest}>
      {children}
    </Tag>
  );
};

export type TokenProps<T extends React.ElementType> = WithAsProp<
  T,
  {
    children?: (data: {
      isTokenHighlighted: boolean;
      children: React.ReactNode;
    }) => React.ReactNode;
  }
>;

const Token = <T extends React.ElementType = 'span'>({
  as,
  children = ({ children }) => <span>{children}</span>,
  className,
  ...rest
}: TokenProps<T>) => {
  const { words } = useRootContext();
  const { line, highlight, lineNumber } = useLineContext();
  const { getTokenProps } = highlight!;
  const Tag = as ?? 'span';

  return (
    <React.Fragment>
      {line.map((token, key) => {
        let { children: contentWithSpaces, ...props } = getTokenProps({
          token,
          className,
        });

        let content = [contentWithSpaces];

        if (words.length) {
          content = contentWithSpaces
            .split(new RegExp(`(${words.map(([word]) => word).join('|')})`))
            .filter(Boolean);
        }

        return (
          <React.Fragment key={key}>
            {content.map((content, i) => (
              <Tag key={i} {...props} {...rest}>
                {children({
                  children: content,
                  isTokenHighlighted: shouldHighlightToken(
                    content,
                    lineNumber,
                    words
                  ),
                })}
              </Tag>
            ))}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export type LineNumberProps<T extends React.ElementType> = WithAsProp<T, {}>;

const LineNumber = <T extends React.ElementType = 'span'>({
  as,
  ...props
}: LineNumberProps<T>) => {
  const { lineNumber } = useLineContext();
  const Tag = as ?? 'span';
  return <Tag {...props}>{lineNumber}</Tag>;
};

CodeBlock.Code = Code;
CodeBlock.LineContent = LineContent;
CodeBlock.Token = Token;
CodeBlock.LineNumber = LineNumber;
