const { resolve } = require("path");
const getPackageName = require("./get-package-name");
const createFiles = require("./create-files");
const setPackageJson = require("./set-package-json");

/** @private */
const name = getPackageName();

/** @private */
const repo = resolve(process.cwd(), name);

module.exports =
async function main() {
	await createFiles(repo);
	await setPackageJson(repo, name);

	console.log("Done!");
};
