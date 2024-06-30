# Bam Library

## Introduction

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
