const TYPES = {
	ACCRSAIDWEB: 'rsa',
	ACCRSAWEB: 'rsa',
	PAJALLWEB: 'paje',
	PAJRESUWEB: 'paje',
	SIMLOGWEB: 'al',
	SIMRESLOGWEB: 'al',
}

export function parseSimulation(record) {
	// Sample record:
	var cafId = record[0], // [ 441,
		dateParts = record[1].split('/'),  // '01/07/2014',
		timeParts = record[2].split(':'),  // '10:02:55',
		ip = record[3],  // '81.50.X.X',
		rubrique = record[4], // 'DOSWEB',
		sousRubrique = record[5],  // 'DOSCOURRNDPWEB',
		matricule = record[6];  // '9462cdb3cb9c194bdfe925c5628cc9222bc846950888f7d5db2e1832fd54aff6' ]

	if (sousRubrique in TYPES) {
		return {
			type: TYPES[sousRubrique],
			status: sousRubrique.indexOf('RES') > -1 ? 'end' : 'start',
			date: new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], timeParts[2]),
			user: matricule
		}
	}
}

let buffer = {};

export function handleSimulationEvent(event) {
	console.log(`${event.type}:${event.status}`);

	if (event.status == 'start') {
		buffer[event.user] = event.date;
	} else {
		let result = event.date - buffer[event.user];
		delete buffer[event.user];
		return result || undefined;  // filter out NaN and 0
	}
}

export function lowPassFilter(limit) {
	return function(value) {
		if (value > limit) {
			console.log(`Dropped ${value} (higher than ${limit})`);
			return;
		}

		return value;
	}

}
