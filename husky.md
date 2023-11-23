```
$ pnpm install -wD @commitlint/cli @commitlint/config-conventional husky
```

在工程根目录下增加 commitlint.config.js 配置文件，指定 commitlint 的校验配置文件：

```
module.exports = { extends: ['@commitlint/config-conventional'] };
```

工程根目录下的 package.json 中增加一条 script:

```
"scripts": {
  "postinstall": "husky install"
}
```

执行如下命令新增一个husky的hook：
```
$ npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'

```
