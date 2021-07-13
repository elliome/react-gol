import sass from "rollup-plugin-sass";
import typescript from "rollup-plugin-typescript2";
import { uglify } from "rollup-plugin-uglify";

import pkg from "./package.json";

export default {
    input: "src/index.tsx",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            exports: "named",
            sourcemap: false,
            strict: true,
        },
    ],
    treeshake: {
        moduleSideEffects: false,
    },
    plugins: [sass({ insert: true }), typescript(), uglify()],
    external: ["react", "react-dom"],
};
