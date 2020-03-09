const { resolve } = require("path");
const { readFile, writeFile } = require("fs");
const { promisify } = require("util");

/** @private */
const read = promisify(readFile);

/** @private */
const write = promisify(writeFile);

/**
 * @param {string} repo Path to local repo
 * @param {string} name Package name
 * @returns {Promise<void>}
 */
module.exports =
async function setPackageJson(repo, name) {
	const filePath = resolve(repo, "package.json");
	const oldContents = await read(filePath, "utf8");

	console.log(`Setting "name" field:\n${ name }\n`);

	const entries = Object.entries(JSON.parse(oldContents));

	entries.unshift([ "name", name ]);

	const author = entries.findIndex(([ key ]) => key === "author");

	if (author !== -1)
		entries.splice(author, 1);

	const newContents = JSON.stringify(Object.fromEntries(entries), null, 2);

	await write(filePath, newContents);
};
