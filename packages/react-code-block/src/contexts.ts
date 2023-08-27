import { createContext, useContext } from 'react';
import type { LineContextProps, RootContextProps } from './types';

export const RootContext = createContext<RootContextProps>({
  code: '',
  language: 'js',
  lines: [],
  words: [],
});

export const LineContext = createContext<LineContextProps>({
  line: [],
  lineNumber: -1,
});

export const useRootContext = () => useContext(RootContext);
export const useLineContext = () => useContext(LineContext);
