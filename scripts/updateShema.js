const fs = require("fs");
const path = require("path");
const schema = require("../routers/graphql/schema");
const { printSchema } = require("graphql");

const schemaPath = path.resolve(
  __dirname,
  "../frontend/src/relay/schema.graphql"
);

fs.writeFileSync(schemaPath, printSchema(schema));

console.log("Wrote " + schemaPath);
