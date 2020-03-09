const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const { fromBuffer } = require("yauzl");

/**
 * @param {string} repoPath Path to repo (includes valid package name)
 * @returns {Promise<void>}
 */
module.exports =
async function createFiles(repoPath) {
	const response = await fetch("https://github.com/parzh/package-javascript/archive/master.zip");
	const buffer = await response.buffer();

	return await new Promise((resolve, reject) => {
		fromBuffer(buffer, { lazyEntries: true }, async (error, zip) => {
			if (error)
				return reject(error);

			if (!zip)
				return resolve();

			const next = () => zip.entriesRead < zip.entryCount ? zip.readEntry() : resolve();

			zip.on("entry", (/** @type {import("yauzl").Entry} */ entry) => {
				if (entry.fileName.endsWith("/"))
					return next();

				const entryFileNameChunks = entry.fileName.split("/");

				entryFileNameChunks.splice(0, 1, repoPath);

				const entryFileName = path.resolve(...entryFileNameChunks);

				console.log(`Creating file:\n${ entryFileName }`);

				fs.mkdirSync(path.dirname(entryFileName), { recursive: true });

				zip.openReadStream(entry, (error, entryStream) => {
					if (error)
						return reject(error);

					if (!entryStream)
						return next();

					const targetFile = fs.createWriteStream(entryFileName);

					entryStream.on("end", () => {
						console.log(""); // empty line
						targetFile.close();
						next();
					});

					entryStream.pipe(targetFile);
				});
			});

			next();
		});
	});
};
