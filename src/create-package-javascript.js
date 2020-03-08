const { resolve } = require("path");
const getPackageName = require("./get-package-name");
const createFiles = require("./create-files");

module.exports =
async function main() {
	await createFiles(resolve(process.cwd(), getPackageName()));
};
