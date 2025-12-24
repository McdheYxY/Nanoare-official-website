# ARENOT | Nanoare official website
网站使用了Github讨论作为博客文章和评论，使用file分支储存二进制文件，使用 Cloudflare Workers 运行，使用 Cloudflare KV 缓存请求。

演示网站：[Nanoare official website](https://arenot.cn/)
<p align="center">
  <a href="https://arenot.cn/" target=_blank><img
    src="https://cdn.jsdelivr.net/gh/mcdheyxy/Nanoare-official-website@files/files/Screenshot_20251224_092728_com.android.chrome.jpg" height="220"
  /></a>
  <a href="https://arenot.cn/" target=_blank><img
    src="https://cdn.jsdelivr.net/gh/mcdheyxy/Nanoare-official-website@files/files/Screenshot_20251224_092717_com.android.chrome.jpg" height="220"
  /></a>
  <a href="https://arenot.cn/" target=_blank><img
    src="https://cdn.jsdelivr.net/gh/mcdheyxy/Nanoare-official-website@files/files/Screenshot_20251224_092724_com.android.chrome.jpg" height="220"
  /></a>
</p>

## 使用说明
本项目部署在 Cloudflare Workers 上，所以下面的教程指针对需要部署在此平台上的人。如果你需要部署到其他平台请移步至[部署](#部署)。

前提条件：
- 注册 Cloudflare 账号
- 注册 Github 账号

步骤：
1. 点击 Star 左边的 Fork 按钮复制本仓库。
2. 在已 Fork 的仓库下点击 Settings->Secrets and variables->Actions->New repository secret。
3. 根据[配置文件](#配置文件)的要求填写 Name 和 Secret。
4. 因为要部署 Cloudflare Workers 所以，要额外添加两条 Cloudflare配置：`CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`。参考：[Set up CI/CD](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/#2-set-up-cicd)。
5. 第一次 Fork 可能会出发 Github 工作流，报错是正常的。现在你需要点击 Actions->执行失败的build任务->重新执行。
6. 稍等几分钟，直到有成功提示。
7. 如果一切顺利你会在 Cloudflare Workers 也看见你已部署的项目。
8. 点开已部署项目的设置页，在变量与机密中至少添加一个`TL_TOKEN`机密配置。（如果有显示不一致的bug就把配置文件中提到的都填上去，注意类型选机密）

## 引用技术
- [NuxtJS](https://nuxt.com/)
- [Vue.js](https://vuejs.org/)
- [markdown-it](https://markdown-it.github.io/)
- [highlight.js](https://highlightjs.org/)

## 开发说明
1. 克隆我们的仓库到本地
```bash
git clone https://github.com/McdheYxY/Nanoare-official-website.git
```
2. 安装依赖
```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### 开发环境
3. 配置环境变量
在项目根目录下有一个`.env.example`文件，这是一个模板文件，程序不会使用它。您在修改键值后将后缀`.example`去掉并保存，程序会自动识别`.env`的文件。
4. 运行&调试
```bash
npm run dev
```

5. 构建
```bash
npm run build
```
### 生产环境
3. 配置环境变量
在项目根目录下有一个`.env.example`文件，这是一个模板文件，程序不会使用它。您在修改键值后将后缀`.example`替换为`.production`并保存，程序会自动识别`.env.production`的文件。
4. 运行&调试
```bash
npm run dev
```

5. 构建
```bash
npm run build:prod
```

## 配置文件
此项目有两个配置文件：`nuxt.config.ts`、`.env`。

优先级：`.env`>`nuxt.config.ts`。
>[!WARNING]
>请不要在`nuxt.config.ts`中包含密钥等私密信息！！！

你可以在[.env.example](https://github.com/McdheYxY/Nanoare-official-website/blob/main/.env.example)中找到以下配置。

| 名称                   | 描述                                                           |
| ---------------------- | -------------------------------------------------------------- |
| NUXT_PUBLIC_LINK       | 您的网站首页域名                                               |
| NUXT_PUBLIC_GHCDN      | 你选择加速您仓库二进制文件的CDN                                |
| NUXT_PUBLIC_CACHE_TIME | 请求被缓存的时间                                               |
| NUXT_PUBLIC_TL_OWNER   | 仓库拥有者名称                                                 |
| NUXT_PUBLIC_TL_NAME    | 仓库名称                                                       |
| TL_TOKEN               | [生成令牌](https://github.com/settings/personal-access-tokens) |

## 部署
此项目基于 NuxtJS。Nuxt 社区十分活跃，在部署第三方方面几乎覆盖了大部分平台。如果你对如何部署在其他平台上感兴趣，请阅读他们的[官方文档](https://nuxt.com/deploy)。