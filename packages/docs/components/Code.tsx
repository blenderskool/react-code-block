import { useState, useEffect } from 'react';
import { onlyText } from 'react-children-utilities';
import { CodeBlock } from 'react-code-block';
import { useCopyToClipboard } from 'react-use';
import theme from './theme';

export default function Code({
  children,
  filename,
  hideLineNumbers = false,
  words = [],
  lines = [],
}) {
  const [, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);
  const code = onlyText(children);
  const options = children.props.className.split(',');
  const language = options[0].replace(/language-/, '');

  const copyCode = () => {
    copyToClipboard(code);
    setIsCopied(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsCopied(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isCopied]);

  return (
    <CodeBlock
      code={code}
      language={language}
      lines={lines}
      words={words}
      theme={theme}
    >
      <div className="bg-gray-50 border border-gray-200 mt-6 rounded-xl code-block relative">
        {filename && (
          <div className="rounded-t-xl bg-gray-200/40 px-4 py-2 text-xs">
            {filename}
          </div>
        )}
        <CodeBlock.Code className="py-4 !px-0 overflow-x-auto">
          {({ isLineHighlighted }) => (
            <div className="table-row relative">
              {!hideLineNumbers ? (
                <CodeBlock.LineNumber className="table-cell text-right text-[10px] pl-4 pr-6 text-gray-400 select-none leading-6" />
              ) : (
                <div className="table-cell pl-4" />
              )}
              <CodeBlock.LineContent className="table-cell w-full pr-4 text-sm leading-6 tracking-tight">
                {isLineHighlighted && (
                  <div className="absolute inset-0 bg-blue-500/10 border-l-2 border-blue-500" />
                )}
                <CodeBlock.Token className="relative">
                  {({ isTokenHighlighted, children }) => (
                    <span
                      className={`relative ${isTokenHighlighted ? 'px-1' : ''}`}
                    >
                      {isTokenHighlighted && (
                        <span className="absolute inset-x-0 -inset-y-0.5 rounded-md bg-blue-500/20" />
                      )}
                      <span className="relative">{children}</span>
                    </span>
                  )}
                </CodeBlock.Token>
              </CodeBlock.LineContent>
            </div>
          )}
        </CodeBlock.Code>

        <button
          className={`absolute ${
            filename ? 'top-11' : 'top-3'
          } right-3 p-1.5 bg-gray-200/70 shadow-sm border border-gray-300/60 text-gray-500 rounded-md`}
          onClick={copyCode}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            {isCopied ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
              />
            )}
          </svg>
        </button>
      </div>
    </CodeBlock>
  );
}
