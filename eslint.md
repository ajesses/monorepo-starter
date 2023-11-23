```
$ pnpm install -wD eslint lint-staged @antfu/eslint-config eslint-define-config

```

在根成根目录下添加 eslint.config.js 配置文件:

```
import antfu from '@antfu/eslint-config'

export default await antfu(
  {
    rules: {
      'no-console': ['error', { allow: ['log', 'warn'] }],
      'array-callback-return': 'off',
      'vue/no-useless-v-bind': 'off',
      'vue/no-mutating-props': 'off',
      'indent': ['error', 2, { SwitchCase: 1 }],
      'quotes': ['error', 'single'],
      'no-undef': 0
    },
  },
)

```

package.json 中增加如下配置:

```
"lint-staged": {
    "*.ts": [
      "eslint --fix",
      "git add"
    ]
}
```

husky 中增加 pre-commit 校验：
```
$ npx husky add .husky/pre-commit "npx --no-install lint-staged"

```
