import fs from 'fs';

import csv from 'csv';
import JSONStream from 'jsonstream';


fs.createReadStream('sample.csv')
	.pipe(csv.parse({
		delimiter: ';',
		auto_parse: true,
	}))
	.pipe(csv.transform(parsePaje))
	.pipe(csv.transform(handleSimulationEvent))
	.pipe(JSONStream.stringify())
	.pipe(fs.createWriteStream('paje.json'));


export function parsePaje(record) {
	// Sample record:
	var cafId = record[0], // [ 441,
		dateParts = record[1].split('/'),  // '01/07/2014',
		timeParts = record[2].split(':'),  // '10:02:55',
		ip = record[3],  // '81.50.X.X',
		rubrique = record[4], // 'DOSWEB',
		sousRubrique = record[5],  // 'DOSCOURRNDPWEB',
		matricule = record[6];  // '9462cdb3cb9c194bdfe925c5628cc9222bc846950888f7d5db2e1832fd54aff6' ]

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
