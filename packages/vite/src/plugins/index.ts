import { createVueJSX } from './tsx'
import { createUnoCSSPluginConfig } from './unocss'
import { createUnplugins } from './unplugin'

interface PluginsEnable {
  tsx: boolean
}

export function createPlugins({
  tsx = true,
}: PluginsEnable) {
  return [
    tsx || createVueJSX(),
    createUnplugins(),
    createUnoCSSPluginConfig(),
  ]
}
