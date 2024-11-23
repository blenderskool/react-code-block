import { Highlight, type HighlightProps } from 'prism-react-renderer';
import React, { type Ref, useMemo } from 'react';
import {
  LineContext,
  RootContext,
  useLineContext,
  useRootContext,
} from './contexts.js';
import type {
  CodeProps,
  LineContentProps,
  LineNumberProps,
} from './shared/prop-types.js';
import type { WithAsProp, WithDisplayName } from './shared/types.js';
import {
  forwardRef,
  parseWordHighlights,
  shouldHighlightLine,
  shouldHighlightToken,
  splitStringByWords,
} from './shared/utils.js';

export interface CodeBlockProps extends Omit<HighlightProps, 'children'> {
  lines?: (number | string)[];
  words?: string[];
  children: React.ReactNode;
}

/**
 * Top-level root component which contains all the sub-components to construct a code block.
 *
 * API Reference: {@link https://react-code-block.netlify.app/api-reference#codeblock}
 */
const CodeBlock = ({
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

const Code = <T extends React.ElementType = 'pre'>(
  { as, children, ...props }: CodeProps<T>,
  ref: Ref<HTMLElement>
) => {
  const { lines, words, ...highlightProps } = useRootContext();

  const Tag = as ?? 'pre';

  return (
    <Highlight {...highlightProps}>
      {(highlight) => (
        <Tag {...props} ref={ref as any}>
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

const LineContent = <T extends React.ElementType = 'div'>(
  { as, children, className, ...rest }: LineContentProps<T>,
  ref: Ref<HTMLElement>
) => {
  const { highlight, line } = useLineContext();
  const { getLineProps } = highlight!;

  const Tag = as ?? 'div';
  return (
    <Tag {...getLineProps({ line, className })} {...rest} ref={ref as any}>
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

const Token = <T extends React.ElementType = 'span'>(
  {
    as,
    children = ({ children }) => <span>{children}</span>,
    className,
    ...rest
  }: TokenProps<T>,
  ref: Ref<HTMLElement>
) => {
  const { words } = useRootContext();
  const { line, highlight, lineNumber } = useLineContext();
  const { getTokenProps } = highlight!;
  const Tag = as ?? 'span';

  return (
    <React.Fragment>
      {line.map((token, key) => {
        const { children: contentWithSpaces, ...props } = getTokenProps({
          token,
          className,
        });
        const content = words.length
          ? splitStringByWords(contentWithSpaces, words)
          : [contentWithSpaces];

        return (
          <React.Fragment key={key}>
            {content.map((content, i) => (
              <Tag key={i} {...props} {...rest} ref={ref}>
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

const LineNumber = <T extends React.ElementType = 'span'>(
  { as, ...props }: LineNumberProps<T>,
  ref: Ref<HTMLElement>
) => {
  const { lineNumber } = useLineContext();
  const Tag = as ?? 'span';
  return (
    <Tag {...props} ref={ref}>
      {lineNumber}
    </Tag>
  );
};

interface CodeComponent extends WithDisplayName {
  <U, T extends React.ElementType = 'pre'>(
    props: CodeProps<T> & { ref?: U }
  ): JSX.Element;
}

interface LineContentComponent extends WithDisplayName {
  <U, T extends React.ElementType = 'div'>(
    props: LineContentProps<T> & { ref?: U }
  ): JSX.Element;
}

interface TokenComponent extends WithDisplayName {
  <U, T extends React.ElementType = 'span'>(
    props: TokenProps<T> & { ref?: U }
  ): JSX.Element;
}

interface LineNumberComponent extends WithDisplayName {
  <U, T extends React.ElementType = 'span'>(
    props: LineNumberProps<T> & { ref?: U }
  ): JSX.Element;
}

/**
 * Container which contains code to render each line of the code.
 *
 * API Reference: {@link https://react-code-block.netlify.app/api-reference#codeblockcode}
 */
CodeBlock.Code = forwardRef(Code) as CodeComponent;

/**
 * Container for a single line of the code.
 *
 * API Reference: {@link https://react-code-block.netlify.app/api-reference#codeblocklinecontent}
 */
CodeBlock.LineContent = forwardRef(LineContent) as LineContentComponent;

/**
 * Renders a syntax-highlighted token from the current line.
 *
 * API Reference: {@link https://react-code-block.netlify.app/api-reference#codeblocktoken}
 */
CodeBlock.Token = forwardRef(Token) as TokenComponent;

/**
 * Renders the line number for the current line.
 *
 * API Reference: {@link https://react-code-block.netlify.app/api-reference#codeblocklinenumber}
 */
CodeBlock.LineNumber = forwardRef(LineNumber) as LineNumberComponent;

export { CodeBlock };
