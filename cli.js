#!/usr/bin/env node
import meow from 'meow';
import generateCleanApp from './scripts/archi.js';

const cli = meow(`
	Usage
	  $ generate-clean-app <my-app> -d <database>

	Options
	  --database, -d  Select database
      List of databases implemented:
      - mysql
      - mongo
      - neo4j
      - postgres

	Example
	  $ generate-clean-app unicorns --database mongo
`, {
	importMeta: import.meta,
	flags: {
		database: {
			type: 'string',
			alias: 'd',
			isRequired: true
		}
	}
});

generateCleanApp(cli.input, cli.flags, cli.showHelp);