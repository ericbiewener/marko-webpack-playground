const path = require("path");

module.exports.getAssetManifestFilename = (buildDir) =>
  path.join(buildDir, "asset-manifest.json");
