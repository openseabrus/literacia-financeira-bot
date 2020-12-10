module.exports = {
    "root": true,
    "parser": '@typescript-eslint/parser',
    "env": {
        "browser": true,
        "node": true,
        "es2021": true
    },
    "plugins": [
        '@typescript-eslint',
        "security",
    ],
    "extends": [
        "plugin:security/recommended",
        "airbnb-typescript/base",
    ],
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module",
        "project": './tsconfig.json',
        "ecmaFeatures": {
            "modules": true
        }
    },
    "rules": {
        "max-len": "off",
        "import/prefer-default-export": "off",
    }
};
