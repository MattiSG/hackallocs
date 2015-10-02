import fs from 'fs';

import csv from 'csv';
import JSONStream from 'jsonstream';


var pajeSimulations = {
	// <MATRICULE>: { starts: [], ends: [] }
}


fs.createReadStream('sample.csv')
	.pipe(csv.parse({
		delimiter: ';',
		auto_parse: true,
	}))
	.pipe(csv.transform(parsePaje))
	.pipe(csv.transform(handleSimulationEvent))
	.pipe(JSONStream.stringify())
	.pipe(process.stdout);


export function parsePaje(record) {
	// sample record:
	// 0 [ 441,
	// 1 '01/07/2014',
	// 2 '10:02:55',
	// 3 '81.50.X.X',
	// 4 'DOSWEB',
	// 5 'DOSCOURRNDPWEB',
	// 6 '9462cdb3cb9c194bdfe925c5628cc9222bc846950888f7d5db2e1832fd54aff6' ]

	var dateParts = record[1].split('/'),
		timeParts = record[2].split(':'),
		sousRubrique = record[5],
		matricule = record[6];

	if (sousRubrique == 'PAJALLWEB' || sousRubrique == 'PAJRESUWEB') {
		return {
			type: 'paje',
			status: sousRubrique == 'PAJALLWEB' ? 'start' : 'end',
			date: new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], timeParts[2]),
			user: matricule
		}
	}
}

let buffer = {};

export function handleSimulationEvent(event) {
	if (event.status == 'start') {
		buffer[event.user] = event.date;
	} else {
		let result = event.date - buffer[event.user];
		delete buffer[event.user];
		return result;
	}

}
