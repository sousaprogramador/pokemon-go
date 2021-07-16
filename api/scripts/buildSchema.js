import { graphql } from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';
import fs from 'fs';
import path from 'path';

import GraphQLSchema from '../src/schema';

async function generateSchema(schema, relativePath) {
  const result = await (graphql(schema, introspectionQuery));

  if (result.errors) {
    console.error(
      'ERROR introspecting schema: ',
      JSON.stringify(result.errors, null, 2),
    );
  } else {
    fs.writeFileSync(
      path.join(__dirname, `${relativePath}/schema.json`),
      JSON.stringify(result, null, 2),
    );

    fs.writeFileSync(
      path.join(__dirname, `${relativePath}/schema.graphql`),
      printSchema(schema),
    );
  }
}

(async () => {
  await generateSchema(GraphQLSchema, '../schemas');

  process.exit(0);
})();
