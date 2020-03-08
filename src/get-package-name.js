const validate = require("validate-npm-package-name");

/**
 * @returns {string} the first CLI argument
 * @throws if the first CLI argument is not a valid package name
 */
module.exports =
function getPackageName() {
	const [ , , name ] = process.argv;

	/** @type {import("validate-npm-package-name").Result} */
	const {
		validForNewPackages,
		errors = [],
		warnings = [],
	} = validate(name);

	if (!validForNewPackages)
		throw new Error([ ...errors, ...warnings ][0] || "Invalid package name");

	return name;
};