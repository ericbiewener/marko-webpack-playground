const path = require("path");

const getNonDynamicFilename = (filename) =>
  path.relative(process.cwd(), filename).replace(/-dynamic/, "");

module.exports = () => ({
  name: "replace-source-filename",
  visitor: {
    StringLiteral(path, state) {
      if (path.node.value !== "__SOURCE_FILENAME__") return;
      path.node.value = getNonDynamicFilename(state.filename);
    },
  },
});
