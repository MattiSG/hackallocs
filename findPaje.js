import fs from 'fs';

import csv from 'csv';


var pajeSimulations = {
	// <MATRICULE>: { starts: [], ends: [] }
}


fs.createReadStream('sample.csv')
	.pipe(csv.parse({
		delimiter: ';',
		auto_parse: true,
	}))
	.pipe(csv.transform(parsePaje))
	.pipe(csv.stringify())
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

	var dateAsString = record[1],
		timeAsString = record[2],
		sousRubrique = record[5],
		matricule = record[6];

	if (sousRubrique == 'PAJALLWEB') {
		pajeSimulations[matricule].starts = pajeSimulations[matricule].starts || [];
		pajeSimulations[matricule].starts.push(dateAsString + timeAsString);
	}
}
