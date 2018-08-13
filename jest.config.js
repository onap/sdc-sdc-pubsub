module.exports = {
    "roots": [
        "<rootDir>/lib"
    ],
    "transform": {
        "^.+\\.ts?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    "testURL": "http://localhost/",
    "coverageDirectory": "<rootDir>/coverage",
    "testResultsProcessor": "jest-sonar-reporter"
};