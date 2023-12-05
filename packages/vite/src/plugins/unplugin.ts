import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import type { Options as UnpluginOptions } from 'unplugin-vue-components/types'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import type { PluginOption } from 'vite'

interface UnpluginsOptions {
  resolvers: UnpluginOptions['resolvers']
  imports: string[]
}

export function createUnplugins(config?: UnpluginsOptions): PluginOption[] {
  return [
    VueMacros({
      defineOptions: false,
      defineModels: false,
      plugins: {
        vue: Vue({
          script: {
            propsDestructure: true,
            defineModel: true,
          },
        }),
      },
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
      ],
      dts: true,
      dirs: [
      ],
      vueTemplate: true,
    }),
    Components({
      dts: true,
      resolvers: config && config.resolvers ? config.resolvers : [],
    }),
  ]
}
