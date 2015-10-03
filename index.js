import fs from 'fs';

import csv from 'csv';
import JSONStream from 'jsonstream';

import { lowPassFilter, parseSimulation, handleSimulationOfType } from './simulation';


fs.createReadStream('web0315.csv')
	.pipe(csv.parse({
		delimiter: ';',
		auto_parse: true,
	}))
	.pipe(csv.transform(parseSimulation))
	.pipe(csv.transform(handleSimulationOfType('paje')))
	.pipe(csv.transform(lowPassFilter(60 * 60 * 1000)))
	.pipe(JSONStream.stringify('[', ',', ']'))
	.pipe(fs.createWriteStream('paje.json'));

fs.createReadStream('web0315.csv')
	.pipe(csv.parse({
		delimiter: ';',
		auto_parse: true,
	}))
	.pipe(csv.transform(parseSimulation))
	.pipe(csv.transform(handleSimulationOfType('al')))
	.pipe(csv.transform(lowPassFilter(60 * 60 * 1000)))
	.pipe(JSONStream.stringify('[', ',', ']'))
	.pipe(fs.createWriteStream('al.json'));
