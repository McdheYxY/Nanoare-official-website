# ARENOT | Nanoare Official Website

This website uses GitHub Discussions as the backend for blog posts and comments, utilizes the `files` branch to store binary assets, and runs on Cloudflare Workers with Cloudflare KV for request caching.

**Demo Site:** [Nanoare Official Website](https://arenot.cn/)

<p align="center"> <a href="https://arenot.cn/" target=_blank><img src="https://cdn.jsdelivr.net/gh/mcdheyxy/Nanoare-official-website@files/files/Screenshot_20251224_092728_com.android.chrome.jpg" height="220" /></a> <a href="https://arenot.cn/" target=_blank><img src="https://cdn.jsdelivr.net/gh/mcdheyxy/Nanoare-official-website@files/files/Screenshot_20251224_092717_com.android.chrome.jpg" height="220" /></a> <a href="https://arenot.cn/" target=_blank><img src="https://cdn.jsdelivr.net/gh/mcdheyxy/Nanoare-official-website@files/files/Screenshot_20251224_092724_com.android.chrome.jpg" height="220" /></a> </p>

<div align="center">

**English** | **[中文](README-CN.md)**

</div>

## Usage Guide

This project is deployed on Cloudflare Workers, so the tutorial below is specifically for users who wish to deploy to this platform. If you need to deploy to other platforms, please skip to the [Deployment](#deployment) section.

### Prerequisites

- Register a Cloudflare account
- Register a GitHub account

### Steps

1. Click the **Fork** button (located to the left of Star) to fork this repository.
2. In your forked repository, navigate to **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.
3. Fill in the **Name** and **Secret** fields according to the requirements in the [Configuration Files](#configuration-files) section.
4. Since you’re deploying to Cloudflare Workers, you’ll need to add two additional Cloudflare configuration entries: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. For details, refer to [Set up CI/CD](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/#2-set-up-cicd) .
5. When you first fork the repository, it may trigger a GitHub workflow—errors at this stage are normal. Now you need to go to **Actions** → click on the failed build task → **Re-run jobs**.
6. Wait a few minutes until you see a success message.
7. If everything goes smoothly, you should see your deployed project in Cloudflare Workers.
8. Open the settings page of your deployed project and add at least a `TL_TOKEN` secret under **Variables and Secrets** (if you encounter display-related bugs, also add all the variables mentioned in [Configuration Files](#configuration-files); be sure to select **Secret** as the type).

## Technologies Used

- [NuxtJS](https://nuxt.com/)
- [Vue.js](https://vuejs.org/)
- [markdown-it](https://markdown-it.github.io/)
- [highlight.js](https://highlightjs.org/)

## Development Guide

### 1. Clone the repository locally

```
git clone https://github.com/McdheYxY/Nanoare-official-website.git
```

### 2. Install dependencies

```
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### Development Environment

#### 3. Configure environment variables

In the project root directory, there is a `.env.example` file. This is a template file and will not be used by the application. After modifying the key-value pairs, remove the `.example` suffix and save it. The application will automatically recognize the `.env` file.

#### 4. Run & Debug

```
npm run dev
```

#### 5. Build

```
npm run build
```

### Production Environment

#### 3. Configure environment variables

In the project root directory, there is a `.env.example` file. This is a template file and will not be used by the application. After modifying the key-value pairs, replace the `.example` suffix with `.production` and save it. The application will automatically recognize the `.env.production` file.

#### 4. Run & Debug

```
npm run dev
```

#### 5. Build

```
npm run build:prod
```

## Configuration Files

This project has two configuration files: `nuxt.config.ts` and `.env`.

**Priority:** `.env` > `nuxt.config.ts`

> [!WARNING]  
> **Do NOT include sensitive information such as secret keys in `nuxt.config.ts`!!!**

You can find the following configuration options in [`.env.example`](https://github.com/McdheYxY/Nanoare-official-website/blob/main/.env.example) and in `runtimeConfig.public` of [`nuxt.config.ts`](https://github.com/McdheYxY/Nanoare-official-website/blob/main/nuxt.config.ts) :

| Name                     | Description                                                          |
| ------------------------ | -------------------------------------------------------------------- |
| `NUXT_PUBLIC_LINK`       | Your website’s homepage domain                                       |
| `NUXT_PUBLIC_GHCDN`      | The CDN you choose to accelerate your repository’s binary files      |
| `NUXT_PUBLIC_CACHE_TIME` | Cache duration for requests                                          |
| `NUXT_PUBLIC_TL_OWNER`   | Repository owner username                                            |
| `NUXT_PUBLIC_TL_NAME`    | Repository name                                                      |
| `TL_TOKEN`               | [Generate Token](https://github.com/settings/personal-access-tokens) |

## Deployment

This project is based on NuxtJS. The Nuxt community is very active, and third-party deployments cover most platforms. If you’re interested in deploying to other platforms, please consult their [official documentation](https://nuxt.com/deploy) .