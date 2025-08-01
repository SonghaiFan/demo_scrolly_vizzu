import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

export default [
  // UMD build
  {
    input: "src/index.js",
    output: {
      file: "dist/scrolly-vizzu.umd.js",
      format: "umd",
      name: "ScrollyVizzu",
      sourcemap: true,
      exports: "named",
      globals: {
        vizzu: "Vizzu",
        d3: "d3",
      },
    },
    external: ["vizzu", "d3"],
    plugins: [resolve(), commonjs()],
  },

  // ESM build
  {
    input: "src/index.js",
    output: {
      file: "dist/scrolly-vizzu.esm.js",
      format: "esm",
      sourcemap: true,
    },
    external: ["vizzu", "d3"],
    plugins: [resolve(), commonjs()],
  },

  // Minified UMD build for CDN
  {
    input: "src/index.js",
    output: {
      file: "dist/scrolly-vizzu.min.js",
      format: "umd",
      name: "ScrollyVizzu",
      sourcemap: true,
      exports: "named",
      globals: {
        vizzu: "Vizzu",
        d3: "d3",
      },
    },
    external: ["vizzu", "d3"],
    plugins: [
      resolve(),
      commonjs(),
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      }),
    ],
  },
];
