const { Transform } = require("stream");

module.exports =
class RemoveAuthor extends Transform {
	/**
	 * @param {Buffer} chunk
	 * @param {import("stream").TransformCallback} callback
	 */
	_transform(chunk, encoding, callback) {
		try {
			const lines = chunk.toString("utf8").split("\n");
			const index = lines.findIndex((line) => line.includes(`"author": "`));
	
			if (index !== -1) {
				lines.splice(index, 1);

				console.log(`(previous "author" value removed)`);
			}
	
			callback(null, lines.join("\n"));
		}

		catch (error) {
			callback(error);
		}
	}
}
