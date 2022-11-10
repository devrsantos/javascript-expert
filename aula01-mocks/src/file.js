const { readFile } = require('fs/promises')
const { join } = require('path')

const { error } = require("./constants.js");

const DEFAULT_OPTION = {
    maxLine: 3,
    fields: ["id","name","profession","age"]
}

class File {
    static async csvToJson(filePath) {
        const content = await File.getFileContent(filePath)
        const validation = File.isValid(content);
        if(!validation.valid) throw new Error(validation.error)
        return content
    }

    static async getFileContent(filePath) {
        return (await readFile(filePath)).toString("utf8")
    }

    static isValid(csvString, options = DEFAULT_OPTION) {
        const [header, ...FileWithoutHeader] = csvString.split("\n")
        const isHeaderValid = header.trim() === options.fields.join(",")
        if (!isHeaderValid) {
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }

        const isContentLengthAccepted = (
            FileWithoutHeader.length > 0 &&
            FileWithoutHeader.length <= options.maxLine
        )

        if (!isContentLengthAccepted) {
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }
        
        return { valid: true }
        
    }
}

(async () => {
    // const result = await File.csvToJson("./../mocks/threeItems-valid.csv");
    // const result = await File.csvToJson("./../mocks/fourItems-invalid.csv");
    // const result = await File.csvToJson("./../mocks/invalid-header.csv");
})();

module.exports = File;