module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    client: {
      jasmine: {
        // Jasmine config (if needed)
      },
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    coverageReporter: {
      dir: require("path").join(
        __dirname,
        "./coverage/masterpiece-cda-tests-2",
      ),
      subdir: ".",
      reporters: [{ type: "html" }, { type: "text-summary" }, { type: "lcov" }],
    },
    reporters: ["progress", "kjhtml"],
    browsers: ["Chrome"], // Use ChromeHeadless instead of Chrome
    restartOnFileChange: true,
    customLaunchers: {
      ChromeHeadless: {
        base: "Chrome",
        flags: [
          "--headless",
          "--disable-gpu", // Disable GPU hardware acceleration
          "--no-sandbox", // Required for CI environments
          "--remote-debugging-port=9222", // Needed for debugging if needed
        ],
      },
    },
  });
};
