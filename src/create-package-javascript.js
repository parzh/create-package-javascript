const getPackageName = require("./get-package-name");
const getRepoPath = require("./get-repo-path");
const createFiles = require("./create-files");
const setPackageJson = require("./set-package-json");

/** @private */
const name = getPackageName();

/** @private */
const repo = getRepoPath(name);

module.exports =
async function main() {
	await createFiles(repo);
	await setPackageJson(repo, name);

	console.log("Done!");
};
