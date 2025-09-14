// global-teardown.js
module.exports = async () => {
  if (global.page) {
    await global.page.context().browser().close();
  }
};
