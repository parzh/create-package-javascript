import getPackageName from "./get-package-name";
import getRepoPath from "./get-repo-path";
import createFiles from "./create-files";
import setPackageJson from "./set-package-json";

/** @private */
const name = getPackageName();

/** @private */
const repo = getRepoPath(name);

export default async function main() {
	await createFiles(repo);
	await setPackageJson(repo, name);

	console.log("Done!");
};
