import React from 'react';
import { DocsThemeConfig } from 'nextra-theme-docs';
import { useRouter } from 'next/router';
import Code from './components/Code';
import Preview from './components/Preview';

const config: DocsThemeConfig = {
  logo: <span className="font-semibold">🧩 React Code Block</span>,
  nextThemes: {
    defaultTheme: 'light',
    forcedTheme: 'light',
  },
  darkMode: false,
  project: {
    link: 'https://github.com/blenderskool/react-code-block',
  },
  docsRepositoryBase:
    'https://github.com/blenderskool/react-code-block/tree/main/docs',
  faviconGlyph: '🧩',
  footer: {
    text: (
      <div className="mx-auto flex flex-col items-center gap-1 text-sm -my-4 text-gray-600">
        <span>
          Released under{' '}
          <a
            href="https://github.com/blenderskool/react-code-block/blob/master/LICENSE"
            target="_blank"
            className="text-gray-800 font-semibold hover:text-blue-600 transition-colors"
          >
            MIT License
          </a>
          .
        </span>
        <span>
          © 2023 - Present&nbsp;
          <a
            href="https://akashhamirwasia.com"
            target="_blank"
            className="text-gray-800 font-semibold hover:text-blue-600 transition-colors"
          >
            Akash Hamirwasia
          </a>
          .
        </span>
      </div>
    ),
  },
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== '/') {
      return {
        titleTemplate: '%s - React Code Block',
      };
    }
  },
  components: {
    pre: Code,
    Preview,
  },
};

export default config;
