import { ESLint } from 'eslint'

type ESLintConfig = ESLint.ConfigData

type ESLintConfigs = ESLintConfig | ESLintConfig[]

type ESLintFunction = () => ESLintConfigs | Promise<ESLintConfigs>

export type ESLintConfigExport = ESLintConfigs | ESLintFunction
