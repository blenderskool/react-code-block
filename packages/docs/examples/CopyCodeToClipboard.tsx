import { CodeBlock } from 'react-code-block';
import { useCopyToClipboard } from 'react-use';

function CodeBlockDemo({ code, language }) {
  const [state, copyToClipboard] = useCopyToClipboard();

  const copyCode = () => {
    // Logic to copy `code`
    copyToClipboard(code);
  };

  return (
    <CodeBlock code={code} language={language}>
      <div className="relative">
        <CodeBlock.Code className="bg-gray-900 !p-6 rounded-xl shadow-lg">
          <div className="table-row">
            <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
            <CodeBlock.LineContent className="table-cell">
              <CodeBlock.Token />
            </CodeBlock.LineContent>
          </div>
        </CodeBlock.Code>

        <button
          className="bg-white rounded-full px-3.5 py-1.5 absolute top-2 right-2 text-sm font-semibold"
          onClick={copyCode}
        >
          {state.value ? 'Copied!' : 'Copy code'}
        </button>
      </div>
    </CodeBlock>
  );
}

export default CodeBlockDemo;
