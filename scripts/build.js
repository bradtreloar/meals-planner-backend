const babel = require("@babel/core");
const fs = require("fs");
const path = require("path");

const SRC_DIR = "./src";
const DIST_DIR = "./dist";
const IGNORED_FILES = [
  "./src/setupTests.ts",
  "./src/setupTestsAfterEnv.ts",
  /\/types\.d\.ts$/,
  /\/types\.ts$/,
];

const listSourceFiles = (dir) => {
  const paths = fs.readdirSync(dir).map((basename) => `${dir}/${basename}`);

  let files = paths.filter((file) => fs.statSync(file).isFile());
  const subDirs = paths.filter((file) => fs.statSync(file).isDirectory());

  subDirs.forEach((subDir) => {
    files = files.concat(listSourceFiles(subDir));
  });

  return files;
};

const listTypeScriptFiles = (dir) => {
  const tsFiles = listSourceFiles(dir).filter((filepath) =>
    filepath.match(/^(.+)\.ts$/)
  );
  return tsFiles.filter((filepath) => {
    for (let pattern of IGNORED_FILES) {
      if (filepath.match(pattern)) {
        return false;
      }
    }
    return true;
  });
};

const listPugFiles = (dir) => {
  return listSourceFiles(dir).filter((path) => path.match(/^(.+)\.pug$/));
};

fs.rmSync(DIST_DIR, {
  recursive: true,
  force: true,
});

listTypeScriptFiles(SRC_DIR).forEach((srcPath) => {
  const { code } = babel.transformFileSync(srcPath);
  const distPath = srcPath
    .replace(new RegExp(`^${SRC_DIR}`), DIST_DIR)
    .replace(/\.ts$/, ".js");
  fs.mkdirSync(path.dirname(distPath), {
    recursive: true,
  });
  const distFile = fs.openSync(distPath, "w");
  fs.writeFileSync(distFile, code);
  fs.closeSync(distFile);
});

listPugFiles(SRC_DIR).forEach((srcPath) => {
  const distPath = srcPath.replace(new RegExp(`^${SRC_DIR}`), DIST_DIR);
  fs.mkdirSync(path.dirname(distPath), {
    recursive: true,
  });
  fs.copyFileSync(srcPath, distPath);
});
