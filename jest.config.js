module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "testMatch": [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    testEnvironment: "node",
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    coverageDirectory: './coverage',
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,js}'],

    // "testTimeout": 20000,
}