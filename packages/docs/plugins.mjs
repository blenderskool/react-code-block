import { visit } from 'unist-util-visit';

export const remarkRemoveFileProp = () => (tree) => {
  visit(tree, 'code', (node) => {
    if (!node.meta) return;

    const matches = node.meta.match(/(.*?)\s?file=[^\s]+\s?([^\s]+)?/);
    if (!matches) return;
    node.meta = `${matches[1] ?? ''} ${matches[2] ?? ''}`;
  });
};
