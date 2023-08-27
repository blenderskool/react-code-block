import type { HighlightProps, RenderProps, Token } from 'prism-react-renderer';

export interface RootContextProps extends Omit<HighlightProps, 'children'> {
  lines: (number | string)[];
  words: [string, [number, number]][];
}

export interface LineContextProps {
  highlight?: RenderProps;
  line: Token[];
  lineNumber: number;
}

export type WithAsProp<T extends React.ElementType, U extends Object> = ({
  as?: T;
} & U) &
  Omit<React.ComponentPropsWithoutRef<T>, keyof U>;
