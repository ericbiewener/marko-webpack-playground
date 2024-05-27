declare global {
  const __non_webpack_require__: NodeRequire;
  const ASSET_MANIFEST_PATH: string;
}

export const getBuildAssetFilename =
  typeof window === "undefined"
    ? (filename: string) => {
        try {
          const result = __non_webpack_require__("fs").readFileSync(
            ASSET_MANIFEST_PATH,
            "utf8"
          );

          const manifest = JSON.parse(result);
          return filename ? manifest[filename] : manifest;
        } catch (error) {
          console.error(`:: error`, error);
        }
      }
    : () => {};
