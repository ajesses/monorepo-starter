### 安装 changesets:

```
# 安装 changesets
pnpm add -W -D @changesets/cli

# 初始化 changesets 文件夹
npx changeset init
```

### 配置 changestes

配置 .changeset/config.json:

```
{
  "$schema": "https://unpkg.com/@changesets/config@1.6.1/schema.json",
  
  // changelog 生成方式
  "changelog": "@changesets/cli/changelog",
  // 开源项目可用 github 格式的 changelog，会附带 commit link
  // "changelog": ["@changesets/changelog-github", { "repo": "changesets/changesets" }]
  
  // 不要让 changeset 在 publish 的时候帮我们做 git add
  "commit": false,
  
  // 配置哪些包要共享版本
  // 参考1：https://github.com/changesets/changesets/blob/main/docs/config-file-options.md#linked-array-of-arrays-of-package-names
  // 参考2：https://github.com/changesets/changesets/blob/main/docs/linked-packages.md#using-glob-expressions
  "linked": [],
  
  // 公私有安全设定，内网建议 restricted ，开源使用 public
  "access": "restricted",
  
  // 项目主分支
  "baseBranch": "origin/main",
  
  // 确保某包依赖的包发生 upgrade，该包也要发生 version upgrade 的衡量单位（量级）
  // https://github.com/changesets/changesets/blob/main/docs/config-file-options.md#updateinternaldependencies
  "updateInternalDependencies": "patch",
  
  // 不需要变动 version 的包
  "ignore": [],
  
  // 在每次 version 变动时一定无理由 patch 抬升依赖他的那些包的版本，防止陷入 major 优先的未更新问题
  "___experimentalUnsafeOptions_WILL_CHANGE_IN_PATCH": {
    // https://github.com/changesets/changesets/blob/c68536edf4c04e7fdf5594ec9c69471cd86fd0ce/packages/assemble-release-plan/src/determine-dependents.ts#L88
    "updateInternalDependents": "always"
  }
}

```

业务项目：
```
{
  "$schema": "https://unpkg.com/@changesets/config@1.6.1/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "linked": [],
  "access": "restricted",
  "baseBranch": "origin/main",
  "updateInternalDependencies": "patch",
  "ignore": [],
  "___experimentalUnsafeOptions_WILL_CHANGE_IN_PATCH": {
    "updateInternalDependents": "always"
  }
}

```

开源项目：
```
{
  "$schema": "https://unpkg.com/@changesets/config@1.6.1/schema.json",
  // ⬇️ 这里和业务的配置不一样~
  "changelog": ["@changesets/changelog-github", { "repo": "owner/repo" }],
  "commit": false,
  "linked": [],
  // ⬇️ 这里和业务的配置不一样~
  "access": "public",
  "baseBranch": "origin/main",
  "updateInternalDependencies": "patch",
  "ignore": [],
  "___experimentalUnsafeOptions_WILL_CHANGE_IN_PATCH": {
    "updateInternalDependents": "always"
  }
}

```

### 修改 packages.json

```
// package.json

// 新增
"scripts": {
    // 构建整个项目的产物
  	"build": "pnpm -r --filter ./packages run build",
    
    // 1. 开始交互式填写变更集
    "changeset": "changeset",
      
    // 2. 用来统一提升版本号
    "version-packages": "changeset version",
     
    // 3. 构建产物后发版
    "release": "pnpm build && pnpm release:only",
    "release:only": "changeset publish --registry=https://registry.npmjs.com/"
}

// 新增
"publishConfig": {
  "access": "public"
}
```

业务项目：
```
// package.json

"scripts": {
  	"build": "pnpm -r --filter ./packages run build",
  
  	// ⬇️ 由于需要频繁使用，本地用更短的命令来节省成本 🥰
    "change": "changeset",
  
    // ⬇️ 由于内部无 github bot，本地用更短的命令节省成本 🥰
    "vp": "pnpm version-packages",
    "version-packages": "changeset version",
  
    "release": "pnpm build && pnpm release:only",
  
  	// ⬇️ 配置公司源
    "release:only": "changeset publish --registry=https://company-registry/"
}

```

开源项目:
```
// package.json

"scripts": {
  	"build": "pnpm -r --filter ./packages run build",
    "changeset": "changeset",
    "version-packages": "changeset version",
    "release": "pnpm build && pnpm release:only",
    "release:only": "changeset publish --registry=https://registry.npmjs.com/"
}

"publishConfig": {
  "access": "public"
}

```

业务项目发布流是怎么样的？

1. 不同开发者先开发，在提交 PR 时使用 pnpm changeset 写入一份变更集
2. 定期项目 owner 发包，使用 pnpm version-packages 消耗所有变更集，由 changesets 自动提升子包版本、生成 changelog 😆
3. 执行 pnpm release 构建全部项目并发包 🥰

开源项目发布流是怎样的？

1. 由 github bot 帮助，每位开发者 PR 前提交一份变更集
2. 由 github bot 帮助，项目 owner 定期点击合入 bot 提出的 发版 PR ，一键合入提升版本，生成 changelog 😆
3. 由 github actions 帮助，当 发版 PR 被合入时，自动发包到 npm 🥰


### 如何 release with tag (like beta version)？

方法一：手动调试法

每次修改完代码后，手工修改某个包的版本号带上 tag 后进行 tag 发布即可:

```
// package.json
{
	"name": "@scope/some-package",
    "version": "1.0.1-beta.1"
}

```

```
# 注意不要忘记附带 tag 的 option
pnpm changeset publish --tag beta

```

方法二：整体调试法

利用官方提供的 Prereleases 模式，通过 pre enter <tag> 命令进入先进入 pre 模式。

名称	功能
alpha	是内部测试版，一般不向外部发布，会有很多Bug，一般只有测试人员使用
beta	也是测试版，这个阶段的版本会一直加入新的功能。在Alpha版之后推出
rc	Release　Candidate 系统平台上就是发行候选版本。RC版不会再加入新的功能了，主要着重于除错


```
# 进入 beta 为 tag 的 prerelease 模式
pnpm changeset pre enter beta

```

之后在此模式下的 changeset publish 均将默认走 beta 环境，下面在此模式下任意的进行你的开发，举一个例子如下：

```
# 1-1 进行了一些开发...
# 1-2 提交变更集
pnpm changeset
# 1-3 提升版本
pnpm vp # changeset version
# 1-4 发包
pnpm release # pnpm build && pnpm changeset publish --registry=...
# 1-5 得到 1.0.0-beta.1

# 2-1 进行了一些开发...
# 2-2 提交变更集
pnpm changeset
# 2-3 提升版本
pnpm vp
# 2-4 发包
pnpm release
# 2-5 得到 1.0.0-beta.2

# ......

```

完全调试好后，退出 prerelease 模式：

```
pnpm changeset pre exit

```
