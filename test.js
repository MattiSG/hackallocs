import expect from 'expect.js';

import { parseSimulation, handleSimulationEvent } from './simulation';


describe('non simulations', () => {
	const RECORD = [ 441,
		'01/07/2014',
		'10:02:55',
		'81.50.X.X',
		'DOSWEB',
		'DOSCOURRNDPWEB',
		'9462cdb3cb9c194bdfe925c5628cc9222bc846950888f7d5db2e1832fd54aff6' ];

	it('should be ignored', () => {
		expect(parseSimulation(RECORD)).to.not.be.ok();
	});
});

describe('simulations', () => {
	const RECORD = [ 441,
		'01/07/2014',
		'10:02:55',
		'81.50.X.X',
		'DOSWEB',
		'PAJALLWEB',
		'9462cdb3cb9c194bdfe925c5628cc9222bc846950888f7d5db2e1832fd54aff6' ];

	it('should return an object', () => {
		expect(parseSimulation(RECORD)).to.be.an('object');
	});

	it('should give the simulation date', () => {
		expect(parseSimulation(RECORD).date).to.eql(new Date(2014, 6, 1, 10, 2, 55));
	});

	it('should give the user identifier', () => {
		expect(parseSimulation(RECORD).user).to.be('9462cdb3cb9c194bdfe925c5628cc9222bc846950888f7d5db2e1832fd54aff6');
	});

	describe('paje start', () => {
		const RECORD = [ 441,
			'01/07/2014',
			'10:02:55',
			'81.50.X.X',
			'DOSWEB',
			'PAJALLWEB',
			'9462cdb3cb9c194bdfe925c5628cc9222bc846950888f7d5db2e1832fd54aff6' ];

		it('should give the simulation type', () => {
			expect(parseSimulation(RECORD).type).to.be('paje');
		});

		it('should give the simulation status', () => {
			expect(parseSimulation(RECORD).status).to.be('start');
		});
	});

	describe('paje ends', () => {
		const RECORD = [ 441,
			'01/07/2014',
			'10:02:55',
			'81.50.X.X',
			'DOSWEB',
			'PAJRESUWEB',
			'9462cdb3cb9c194bdfe925c5628cc9222bc846950888f7d5db2e1832fd54aff6' ];

		it('should give the simulation type', () => {
			expect(parseSimulation(RECORD).type).to.be('paje');
		});

		it('should give the simulation status', () => {
			expect(parseSimulation(RECORD).status).to.be('end');
		});
	});


	describe('rsa start', () => {
		const RECORD = [ 441,
			'01/07/2014',
			'10:02:55',
			'81.50.X.X',
			'DOSWEB',
			'ACCRSAIDWEB',
			'9462cdb3cb9c194bdfe925c5628cc9222bc846950888f7d5db2e1832fd54aff6' ];

		it('should give the simulation type', () => {
			expect(parseSimulation(RECORD).type).to.be('rsa');
		});

		it('should give the simulation status', () => {
			expect(parseSimulation(RECORD).status).to.be('start');
		});
	});

	describe('rsa alternate start', () => {
		const RECORD = [ 441,
			'01/07/2014',
			'10:02:55',
			'81.50.X.X',
			'DOSWEB',
			'ACCRSAWEB',
			'9462cdb3cb9c194bdfe925c5628cc9222bc846950888f7d5db2e1832fd54aff6' ];

		it('should give the simulation type', () => {
			expect(parseSimulation(RECORD).type).to.be('rsa');
		});

		it('should give the simulation status', () => {
			expect(parseSimulation(RECORD).status).to.be('start');
		});
	});
});

describe('time diff', () => {
	const START = {
		type: 'paje',
		status: 'start',
		user: 'toto',
		date: new Date(2015, 6, 1, 12, 12)
	};
	const END = {
		type: 'paje',
		status: 'end',
		user: 'toto',
		date: new Date(2015, 6, 1, 12, 21)
	};

	it('should return nothing on a first end', () => {
		expect(handleSimulationEvent(END)).to.be(undefined);
	});

	it('should return nothing on a first start', () => {
		expect(handleSimulationEvent(START)).to.be(undefined);
	});

	it('should return a time diff on a first matching end', () => {
		let subject = handleSimulationEvent(END);
		expect(subject).to.be.a('number');
		expect(Number.isNaN(subject)).to.be(false);
	});
});
