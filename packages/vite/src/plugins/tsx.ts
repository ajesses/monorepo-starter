import type { Options } from '@vitejs/plugin-vue-jsx'
import VueJsx from '@vitejs/plugin-vue-jsx'
import type { PluginOption } from 'vite'

export function createVueJSX(config?: Options): PluginOption {
  return VueJsx(config || {})
}
