const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
    extends: [
        'eslint:recommended',
        'prettier',
        require.resolve('@vercel/style-guide/eslint/next'),
        'eslint-config-turbo',
    ],
    globals: {
        React: true,
        JSX: true,
    },
    env: {
        node: true,
        browser: true,
    },
    plugins: ['only-warn', 'simple-import-sort', 'unused-imports'],
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
    ],
    overrides: [{ files: ['*.js?(x)', '*.ts?(x)'] }],
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

