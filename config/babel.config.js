module.exports = {
    presets: [
        ["@babel/preset-env",
            {
                targets: { node: "current" },
                useBuiltIns: "usage",
                corejs: 3,
                debug: false,
            }
        ]
    ],
    plugins: [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-nullish-coalescing-operator",
        "dynamic-import-node",
    ],
    env: {
        test: {
            plugins: ["@babel/plugin-transform-runtime",
                "@babel/plugin-proposal-optional-chaining",
                "@babel/plugin-proposal-nullish-coalescing-operator",
                "react-hot-loader/babel",
                "syntax-dynamic-import",
                "dynamic-import-node",
                "transform-class-properties",
                "transform-decorators-legacy",
                "@babel/plugin-syntax-dynamic-import",
            ]
        }
    }
};