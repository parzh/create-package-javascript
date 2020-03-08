const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const { fromBuffer } = require("yauzl");

/**
 * @param {string} folder Folder name (includes valid package name)
 * @returns {Promise<void>}
 */
module.exports =
async function createFiles(folder) {
	const response = await fetch("https://github.com/parzh/package-javascript/archive/master.zip");
	const buffer = await response.buffer();

	fromBuffer(buffer, { lazyEntries: true }, async (error, zip) => {
		if (error) throw error;
		if (!zip) return;

		zip.on("entry", (/** @type {import("yauzl").Entry} */ entry) => {
			if (entry.fileName.endsWith("/"))
				zip.readEntry();

			else {
				const entryFileNameChunks = entry.fileName.split("/");

				entryFileNameChunks.splice(0, 1, folder);

				const entryFileName = path.resolve(...entryFileNameChunks);

				console.log(`Creating file:\n${ entryFileName }\n`);

				fs.mkdirSync(path.dirname(entryFileName), { recursive: true });

				zip.openReadStream(entry, (error, stream) => {
					if (error) throw error;

					if (!stream)
						zip.readEntry();

					else {
						const target = fs.createWriteStream(entryFileName);

						stream.pipe(target);

						stream.on("end", () => {
							target.close();
							zip.readEntry();
						});
					}
				});
			}
		});

		zip.readEntry();
	});
};
