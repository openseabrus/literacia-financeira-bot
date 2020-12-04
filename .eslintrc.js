module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es2021": true
    },
    "plugins": [
        "security"
    ],
    "extends": [
        "plugin:security/recommended",
        "eslint:recommended",
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
    }
};
