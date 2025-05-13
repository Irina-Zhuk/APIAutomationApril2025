/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: "node",
    transform: {
        "^.+\.tsx?$": ["ts-jest", {}],
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],


  reporters: [ "default", [
    "jest-junit",
    {
      outputDirectory: "reports",
      outputName: "junit.xml",
    },
  ],
      [
      "jest-html-reporter",
          {
            pageTitle: "Test Report",
            outputPath: "reports/test-report.html",
            includeFailureMsg: true,
            includeConsoleLog: true,
          }
      ]
  ]
};