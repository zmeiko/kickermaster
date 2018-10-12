const fs = require("fs");
const path = require("path");
const schema = require("../schema");
const { printSchema } = require("graphql");

const schemaPath = path.resolve(__dirname, "../schema/schema.graphql");

fs.writeFileSync(schemaPath, printSchema(schema));

console.log("Wrote " + schemaPath);
