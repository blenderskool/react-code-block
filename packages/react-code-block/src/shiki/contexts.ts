import { createContext } from 'react';
import type { ShikiLineContextProps, ShikiRootContextProps } from './types.js';
import { createUseContext } from '../shared/utils.js';

export const ShikiRootContext = createContext<
  ShikiRootContextProps | undefined
>(undefined);

export const ShikiLineContext = createContext<
  ShikiLineContextProps | undefined
>(undefined);

export const useRootContext = createUseContext(
  ShikiRootContext,
  'Could not find nearest <CodeBlock /> component. Please wrap this component with a <CodeBlock /> component imported from "react-code-block/shiki".'
);

export const useLineContext = createUseContext(
  ShikiLineContext,
  'Could not find nearest <CodeBlock.Code /> component. Please wrap this component with <CodeBlock.Code /> component imported from "react-code-block/shiki".'
);
