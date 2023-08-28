import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import remarkCodeImport from 'remark-code-import';
import nextra from 'nextra';
import { remarkRemoveFileProp } from './plugins.mjs';

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  codeHighlight: false,
  mdxOptions: {
    remarkPlugins: [remarkCodeImport, remarkRemoveFileProp],
    rehypePlugins: [rehypeMdxCodeProps],
  },
});

export default withNextra({
  output: 'export',
  images: {
    unoptimized: true,
  },
});
