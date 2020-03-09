import commander from "commander";

/** @private */
interface Program extends commander.Command {
	in?: string;
}

/** @public */
const program: Program = commander
	.name("create-package-javascript")
	.usage("<name> [--in <path>]")
	.option("<name>", "valid package name\nsee https://github.com/npm/validate-npm-package-name#naming-rules")
	.option("-p, --in <path>", "path for new package code\nrelative to process's current working directory")
	.parse(process.argv);

export default program;
