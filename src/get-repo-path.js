const { cwd } = require("process");
const { resolve } = require("path");
const program = require("./program");

/**
 * @param {string} name Package name (assume is valid). Used as a fallback if path is unspecified
 * @returns {string}
 */
module.exports =
function getRepoPath(name) {
	return resolve(cwd(), program.in || name);
};
