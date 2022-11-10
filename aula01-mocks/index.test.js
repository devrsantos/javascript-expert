const { rejects, deepStrictEqual } = require("assert")
const { join } = require('path');

const { error } = require("./src/constants.js")
const File = require("./src/file.js")
    ;
(async () => {
    {
        const filePath = join(__dirname, './mocks/emptyFile-invalid.csv')
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = join(__dirname, './mocks/fourItems-invalid.csv')
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = join(__dirname, './mocks/threeItems-valid.csv')
        const result = await File.csvToJson(filePath)
        const expected = [
            {
                "id": 14,
                "name": "Renan Augusto",
                "profession": "Developer JavaScript",
                "age": 33
            },
            {
                "id": "07",
                "name": "Aidan Santos",
                "profession": "Instructor JavaScript",
                "age": "07"
            },
            {
                "id": "08",
                "name": "Allyssa Santos",
                "profession": "Specialist JavaScript",
                "age": "03"
            }
        ]
        deepStrictEqual(result, expected)
    }
})();