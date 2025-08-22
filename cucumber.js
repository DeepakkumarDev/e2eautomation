module.exports = {
  default: {
    require: [
      "step_definitions/**/*.js",   // all step defs
      "config/hooks.js"            // hooks file
    ],
    format: [
      "progress",                  // console output
      "html:reports/cucumber-report.html" // HTML report
    ],
    publishQuiet: true,            // disable publishing banner
    paths: [
      "feature/**/*.feature"       // all feature files
    ],
    parallel: 1,                   // run tests sequentially (can change to >1 if needed)
    // requireModule: ["@babel/register"], // if you want ES6+ support
    timeout: 60000                 // step timeout (60s)
  }
};
