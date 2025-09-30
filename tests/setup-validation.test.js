/**
 * TDD Test: Project Setup Validation
 * Task 1.1 - Next.js 15 + React 19 プロジェクトの初期化
 *
 * この検証テストは以下を確認します:
 * - Next.js 15.1+ がインストールされている
 * - React 19 がインストールされている
 * - TypeScript strict モードが有効
 * - Tailwind CSS 3.4+ が設定されている
 * - ESLint, Prettier, Husky が設定されている
 */

const fs = require('fs');
const path = require('path');

describe('Task 1.1: Next.js 15 + React 19 Project Setup', () => {
  const rootDir = path.join(__dirname, '..');

  test('package.json が存在する', () => {
    const packageJsonPath = path.join(rootDir, 'package.json');
    expect(fs.existsSync(packageJsonPath)).toBe(true);
  });

  test('Next.js 15.1+ がインストールされている', () => {
    const packageJsonPath = path.join(rootDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    const nextVersion = packageJson.dependencies?.next || packageJson.devDependencies?.next;
    expect(nextVersion).toBeDefined();

    // バージョンチェック: 15.1 以上
    const versionMatch = nextVersion.match(/(\d+)\.(\d+)/);
    if (versionMatch) {
      const major = parseInt(versionMatch[1], 10);
      const minor = parseInt(versionMatch[2], 10);
      expect(major).toBeGreaterThanOrEqual(15);
      if (major === 15) {
        expect(minor).toBeGreaterThanOrEqual(1);
      }
    }
  });

  test('React 19 がインストールされている', () => {
    const packageJsonPath = path.join(rootDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    const reactVersion = packageJson.dependencies?.react;
    expect(reactVersion).toBeDefined();

    // React 19 チェック
    const versionMatch = reactVersion.match(/(\d+)/);
    if (versionMatch) {
      const major = parseInt(versionMatch[1], 10);
      expect(major).toBeGreaterThanOrEqual(19);
    }
  });

  test('TypeScript が strict モードで設定されている', () => {
    const tsconfigPath = path.join(rootDir, 'tsconfig.json');
    expect(fs.existsSync(tsconfigPath)).toBe(true);

    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
    expect(tsconfig.compilerOptions?.strict).toBe(true);
  });

  test('Tailwind CSS 3.4+ が設定されている', () => {
    const packageJsonPath = path.join(rootDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    const tailwindVersion = packageJson.devDependencies?.tailwindcss;
    expect(tailwindVersion).toBeDefined();

    // バージョンチェック: 3.4 以上
    const versionMatch = tailwindVersion.match(/(\d+)\.(\d+)/);
    if (versionMatch) {
      const major = parseInt(versionMatch[1], 10);
      const minor = parseInt(versionMatch[2], 10);
      expect(major).toBeGreaterThanOrEqual(3);
      if (major === 3) {
        expect(minor).toBeGreaterThanOrEqual(4);
      }
    }
  });

  test('Tailwind config ファイルが存在する', () => {
    const tailwindConfigPath = path.join(rootDir, 'tailwind.config.ts');
    const tailwindConfigPathJs = path.join(rootDir, 'tailwind.config.js');
    const hasConfig = fs.existsSync(tailwindConfigPath) || fs.existsSync(tailwindConfigPathJs);
    expect(hasConfig).toBe(true);
  });

  test('ESLint が設定されている', () => {
    const packageJsonPath = path.join(rootDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    const hasEslint = packageJson.devDependencies?.eslint;
    expect(hasEslint).toBeDefined();

    const eslintConfigPath = path.join(rootDir, '.eslintrc.json');
    const eslintConfigPathJs = path.join(rootDir, 'eslint.config.js');
    const hasConfig = fs.existsSync(eslintConfigPath) || fs.existsSync(eslintConfigPathJs);
    expect(hasConfig).toBe(true);
  });

  test('Prettier が設定されている', () => {
    const packageJsonPath = path.join(rootDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    const hasPrettier = packageJson.devDependencies?.prettier;
    expect(hasPrettier).toBeDefined();
  });

  test('Husky が設定されている', () => {
    const packageJsonPath = path.join(rootDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    const hasHusky = packageJson.devDependencies?.husky;
    expect(hasHusky).toBeDefined();
  });

  test('App Router 構造が存在する', () => {
    const appDirPath = path.join(rootDir, 'src', 'app');
    expect(fs.existsSync(appDirPath)).toBe(true);
  });
});