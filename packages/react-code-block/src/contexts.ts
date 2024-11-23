import { createContext } from 'react';
import { createUseContext } from './shared/utils.js';
import type { LineContextProps, RootContextProps } from './types.js';

export const RootContext = createContext<RootContextProps | undefined>(
  undefined
);

export const LineContext = createContext<LineContextProps | undefined>(
  undefined
);

export const useRootContext = createUseContext(
  RootContext,
  'Could not find nearest <CodeBlock /> component. Please wrap this component with a <CodeBlock /> component imported from "react-code-block".'
);

export const useLineContext = createUseContext(
  LineContext,
  'Could not find nearest <CodeBlock.Code /> component. Please wrap this component with <CodeBlock.Code /> component imported from "react-code-block".'
);
