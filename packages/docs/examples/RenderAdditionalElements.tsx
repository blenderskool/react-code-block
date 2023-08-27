import { CodeBlock } from 'react-code-block';

function CodeBlockDemo({ code, language, filename }) {
  return (
    <CodeBlock code={code} language={language} lines={['4:6']}>
      <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-lg">
        {/* Filename */}
        <div className="text-sm text-gray-400 px-6 py-4">{filename}</div>

        <CodeBlock.Code className="!px-0">
          {({ isLineHighlighted }) => (
            <div
              className={`table-row ${
                isLineHighlighted ? 'bg-emerald-400/25' : ''
              }`}
            >
              {/* Rendering a plus sign */}
              <div
                className={`table-cell px-4 text-emerald-400 select-none ${
                  isLineHighlighted ? 'opacity-100' : 'opacity-0'
                }`}
              >
                +
              </div>
              <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
              <CodeBlock.LineContent className="table-cell w-full pr-6">
                <CodeBlock.Token />
              </CodeBlock.LineContent>
            </div>
          )}
        </CodeBlock.Code>

        {/* Language being used */}
        <div className="text-sm text-gray-400 px-6 pb-4 text-right uppercase select-none">
          {language}
        </div>
      </div>
    </CodeBlock>
  );
}

export default CodeBlockDemo;
