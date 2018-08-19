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
        "js",
    ],
    "testURL": "http://localhost/",
    "coverageDirectory": "<rootDir>/coverage",
    "testResultsProcessor": "jest-sonar-reporter"
};