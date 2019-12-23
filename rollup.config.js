import path from "path";
import vue from "rollup-plugin-vue";
const { createRollupConfig } = require("../../util");

export default createRollupConfig({
  plugins: [vue()],
  external: ["vue"],
  dirname: __dirname,
  input: path.join(__dirname, "/index.vue")
});
