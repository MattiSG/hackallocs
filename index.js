import fs from 'fs';

import csv from 'csv';
import JSONStream from 'jsonstream';

import { lowPassFilter, parseSimulation, handleSimulationEvent } from './simulation';


fs.createReadStream('sample.csv')
	.pipe(csv.parse({
		delimiter: ';',
		auto_parse: true,
	}))
	.pipe(csv.transform(parseSimulation))
	.pipe(csv.transform(handleSimulationEvent))
	.pipe(csv.transform(lowPassFilter(60 * 60 * 1000)))
	.pipe(JSONStream.stringify('[', ',', ']'))
	.pipe(fs.createWriteStream('paje.json'));
