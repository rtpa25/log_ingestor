const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * internal (bundled by their consumer) libraries
 * that utilize React.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

/** @type {import("eslint").Linter.Config} */
module.exports = {
    extends: ['eslint:recommended', 'prettier', 'eslint-config-turbo'],
    plugins: ['only-warn', 'simple-import-sort', 'unused-imports'],
    globals: {
        React: true,
        JSX: true,
    },
    env: {
        browser: true,
    },
    settings: {
        'import/resolver': {
            typescript: {
                project,
            },
        },
    },
    ignorePatterns: [
        // Ignore dotfiles
        '.*.js',
        'node_modules/',
        'dist/',
    ],
    overrides: [
        // Force ESLint to detect .tsx files
        { files: ['*.js?(x)', '*.ts?(x)'] },
    ],
    rules: {
        //#region  //*=========== Unused Imports ===========
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
        'unused-imports/no-unused-imports': 'warn',
        //#endregion  //*======== Unused Imports ===========
        //#region  //*=========== Sort Import ===========
        'simple-import-sort/exports': 'warn',
        'simple-import-sort/imports': ['warn', {}],
        //#endregion  //*======== Sort Import ===========
    },
};

