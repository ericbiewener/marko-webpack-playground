const fs = require("fs/promises");
const path = require("path");
const { getAssetManifestFilename } = require("./get-asset-manifest-filename");

const defaultShouldIncludeFile = (filename) => filename.startsWith("src/");

module.exports.createSourceToBuildFilenameAssetManifestPlugin = ({
  shouldIncludeFile = defaultShouldIncludeFile,
  buildDir,
}) => {
  const assetManifestFilename = getAssetManifestFilename(buildDir);

  return {
    apply(compiler) {
      compiler.hooks.afterEmit.tapAsync(
        "SourceFilenameAssetManifestPlugin",
        async ({ chunks, chunkGraph }, callback) => {
          const fileMappings = {};

          chunks.forEach((chunk) => {
            chunkGraph
              .getChunkModulesIterable(chunk)
              .forEach((module) => {
                if (!module.resource) return;

                const relativePath = path.relative(
                  process.cwd(),
                  module.resource
                );

                if (
                  relativePath.startsWith("node_modules/") ||
                  !shouldIncludeFile(relativePath)
                ) {
                  return;
                }

                // It's possible that a source file gets split into multiple chunks.
                fileMappings[relativePath] = [...chunk.files].map((file) =>
                  path.relative(
                    buildDir,
                    path.join(compiler.options.output.path, file)
                  )
                );
              });
          });

          await fs.writeFile(
            assetManifestFilename,
            JSON.stringify(fileMappings)
          );
          callback();
        }
      );
    },
  };
};
