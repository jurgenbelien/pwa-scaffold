import { output, plugins, cacheManifestLocation } from './rollup.config';
import alias from '@rollup/plugin-alias';

export default {
  input: 'src/sw.ts',
  output: {
    ...output,
    entryFileNames: '[name].js',
  },
  plugins: [
    ...plugins,
    alias({
      entries: { cacheManifest: `../${cacheManifestLocation}` }
    }),
  ],
}
