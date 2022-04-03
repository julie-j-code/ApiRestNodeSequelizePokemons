{
    "env": {
        "es6": true,
            "node": true
    },
    "extends": "eslint:recommended",
        "parserOptions": {
        "ecmaVersion": 2015,
            "sourceType": "module",
                "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        }
    },
    "rules": {
        "no-console": 0,
            "indent": [
                "error",
                "tab"
            ],
                "linebreak-style": [
                    "error",
                    "windows"
                ],
                    "quotes": [
                        "error",
                        "single"
                    ],
                        "semi": [
                            "error",
                            "always"
                        ]
    }
}

