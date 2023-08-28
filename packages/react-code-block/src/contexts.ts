import { createContext, useContext } from 'react';
import type { LineContextProps, RootContextProps } from './types';

export const RootContext = createContext<RootContextProps | undefined>(
  undefined
);

export const LineContext = createContext<LineContextProps | undefined>(
  undefined
);

export const useRootContext = () => {
  const ctx = useContext(RootContext);
  if (ctx === undefined) {
    throw new Error(
      'Could not find nearest <CodeBlock /> component. Please wrap this component with a <CodeBlock /> component.'
    );
  }
  return ctx;
};

export const useLineContext = () => {
  const ctx = useContext(LineContext);
  if (ctx === undefined) {
    throw new Error(
      'Could not find nearest <CodeBlock.Code /> component. Please wrap this component with <CodeBlock.Code /> component.'
    );
  }
  return ctx;
};
