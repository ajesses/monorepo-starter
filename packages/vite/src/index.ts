import path from 'node:path'
import { createPlugins } from './plugins'

export function createViteConfig() {
  return {
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    server: {
      host: '0.0.0.0',
      port: 9527,
    },
    build: {
      target: 'es2015',
      rollupOptions: {
        output: {
          manualChunks: {
          },
        },
      },
    },
    plugins: createPlugins({
      tsx: true,
    }),
  }
}
