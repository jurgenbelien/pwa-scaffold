import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import html, { makeHtmlAttributes } from '@rollup/plugin-html';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import outputManifest from 'rollup-plugin-output-manifest';
import postcss from 'rollup-plugin-postcss';

const postcssConfig = require('./postcss.config'); // file cannot be imported as ES6 module

const cacheManifestFile = 'cache-manifest.json';
export const buildDest = 'dist';
export const cacheManifestLocation = `${buildDest}/${cacheManifestFile}`;

export const plugins = [
  typescript(),
  nodeResolve(),
  json(),
  commonjs(),
  babel({
    exclude: 'node_modules/**',
  }),
  postcss({
    ...postcssConfig
  }),
];

export const output = {
  format: 'es',
  sourcemap: true,
  entryFileNames: '[name].[hash].js',
  dir: buildDest,
};

const template = ({ attributes, files, meta, publicPath, title }) => {
  const manifest = 'manifest.json';
  const scripts = (files.js || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.script);
      return `<script src="${publicPath}${fileName}"${attrs}></script>`;
    })
    .join('\n');

  const css = (files.css || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.link);
      return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
    })

  const links = [
    `<link href="${publicPath}${manifest}" rel="manifest">`, // Add PWA manifest.json
    ...css,
  ].join('\n');

  const metas = meta
    .map((input) => {
      const attrs = makeHtmlAttributes(input);
      return `<meta${attrs}>`;
    })
    .join('\n');

  return `<!doctype html>
  <html${makeHtmlAttributes(attributes.html)}>
    <head>
      ${metas}
      <title>${title}</title>
      ${links}
    </head>
    <body>
      ${scripts}
    </body>
  </html>`;
}

export default {
  input: 'src/index.ts',
  output,
  plugins: [
    ...plugins,
    outputManifest({
      fileName: cacheManifestFile,
    }),
    html({
      title: 'PWA Scaffold',
      template
    }),
  ]
};
