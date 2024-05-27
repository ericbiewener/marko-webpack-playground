const webpack = require("webpack");
const { getAssetManifestFilename } = require("./get-asset-manifest-filename");

module.exports.createDynamicImportsWebpackDefinePlugin = (buildDir) =>
  new webpack.DefinePlugin({
    ASSET_MANIFEST_PATH: `'${getAssetManifestFilename(buildDir)}'`,
  });
