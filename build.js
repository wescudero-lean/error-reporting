const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["src/error-reporter.tsx"],
    bundle: true,
    outfile: "dist/error-reporter.js",
    format: "esm", // exporta como módulo para browsers modernos
    minify: true,
    sourcemap: true,
    loader: { ".tsx": "tsx", ".ts": "ts" },
  })
  .catch(() => process.exit(1));
