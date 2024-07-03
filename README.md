# Bam Library

## Introduction (EN)

This is a powerful and flexible frontend UI library with the following features:

- Supports Theme System and Headless
- Core state management and utility libraries are framework-agnostic
- Supports Micro Frontends
- Supports Server Side Render (SSR)

### Supports Theme System and Headless

This UI library provides a flexible Theme System, allowing developers to customize and switch themes as needed. You can easily tailor color schemes, fonts, and other styles to achieve brand consistency and personalized user experiences. Additionally, it supports Headless mode, giving developers complete control over the structure and behavior of the UI, utilizing only its core functionalities to create custom appearances and interactions.

### Framework-agnostic Core State Management and Utility Libraries

Our UI library's core state management and utility libraries are designed to be highly flexible and can be seamlessly used across multiple frameworks. Whether you are using React, Vue.js, or Angular, you can effortlessly integrate these core functionalities, maintaining a consistent development experience and performance advantage across different projects. This cross-framework design significantly enhances development efficiency and reduces the learning curve.

### Supports Micro Frontends

This UI library fully supports the micro frontend architecture, allowing developers to break down large applications into independent, smaller frontend modules. Each module can be independently developed, tested, and deployed by different teams. This not only improves development efficiency but also enhances the maintainability and scalability of applications.

### Supports Server Side Render (SSR)

To provide better SEO performance and faster initial rendering times, this UI library comes with built-in support for Server Side Render (SSR). With SSR, pages can be generated as HTML on the server and then sent to the client, reducing the time for the user's first load and improving the overall user experience. Whether you are building content-driven websites or complex applications, SSR support can bring significant performance improvements.

### Conclusion

By supporting Theme System and Headless, framework-agnostic core state management and utility libraries, micro frontends, and SSR, this frontend UI library offers developers exceptional flexibility and powerful features. Whether for small projects or large applications, it can meet your needs and significantly boost development efficiency.

## 介紹 (CH)

這是一款功能強大且靈活的前端 UI 庫，具備以下特性：

- 支援 Theme System 和 Headless
- 核心狀態管理和核心作用庫可以跨框架使用
- 支援微前端
- 支援 Server Side Render (SSR)

### 支援 Theme System 和 Headless

此 UI 庫提供靈活的 Theme System，讓開發者可以根據需求自定義和切換主題。你可以輕鬆地定制配色方案、字體和其他樣式，從而實現品牌一致性和用戶體驗的個性化。同時，它也支援 Headless 模式，使得開發者可以完全控制 UI 的結構和行為，只利用其核心功能來實現自定義的外觀和交互。

### 跨框架的核心狀態管理和核心作用庫

我們的 UI 庫的核心狀態管理和作用庫設計得非常靈活，可以無縫地在多個框架中使用。無論你使用的是 React、Vue.js 還是 Angular，都可以輕鬆地集成這些核心功能，從而在不同的項目中保持一致的開發體驗和性能優勢。這種跨框架的設計大大提升了開發效率，減少了學習成本。

### 支援微前端

這款 UI 庫完全支援微前端架構，使得開發者可以將大型應用拆分成獨立的小型前端模塊，每個模塊可以由不同的團隊獨立開發、測試和部署。這不僅提高了開發效率，還增強了應用的可維護性和可擴展性。

### 支援 Server Side Render (SSR)

為了提供更好的 SEO 效果和更快的初次渲染時間，這款 UI 庫內建了對 Server Side Render（SSR）的支援。通過 SSR，頁面可以在服務器端生成 HTML，然後發送到客戶端，從而縮短用戶首次加載的時間，並改善整體用戶體驗。無論是構建內容驅動的網站還是複雜的應用程序，SSR 的支援都能帶來顯著的性能提升。

### 總結

這款前端 UI 庫通過支援 Theme System 和 Headless、跨框架的核心狀態管理和作用庫、微前端和 SSR，為開發者提供了極高的靈活性和強大的功能。無論是小型項目還是大型應用，它都能滿足你的需求，並大大提升開發效率。

## Environment

- Nodejs v20.11.0
- Pnpm v8.15.1

## Setup

```sh
npm run setup
```

## Folder Structure

```md
  .
  ├── .vscode                 # VSCode settings
  ├── apps                    # Test applications
  │   └── [app_name]          #
  ├── modules                 # Base package modules
  │   └── [module_name]       #
  ├── packages                # Core packages
  │   └── [package_name]      #
  ├── scripts                 # CI/CD scripts
  └── package.json            #
```

## Modules

- eslint-config
- eslint-plugin
- prettier-config
- typescript-config
- react-babel

## Packages

- builder
- utils
- cssinjs
- button
- bam-ui

## Apps

- vite-preview
- ui-preview
- next-test
- micro-app-test
- e2e-test
