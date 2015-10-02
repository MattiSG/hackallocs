import expect from 'expect.js';

import { parsePaje, handleSimulationEvent } from './findPaje';


describe('non simulations', () => {
	const RECORD = [ 441,
		'01/07/2014',
		'10:02:55',
		'81.50.X.X',
		'DOSWEB',
		'DOSCOURRNDPWEB',
		'9462cdb3cb9c194bdfe925c5628cc9222bc846950888f7d5db2e1832fd54aff6' ];

	it('should be ignored', () => {
		expect(parsePaje(RECORD)).to.not.be.ok();
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
		expect(parsePaje(RECORD)).to.be.an('object');
	});

	it('should give the simulation date', () => {
		expect(parsePaje(RECORD).date).to.eql(new Date(2014, 6, 1, 10, 2, 55));
	});

	it('should give the user identifier', () => {
		expect(parsePaje(RECORD).user).to.be('9462cdb3cb9c194bdfe925c5628cc9222bc846950888f7d5db2e1832fd54aff6');
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
			expect(parsePaje(RECORD).type).to.be('paje');
		});

		it('should give the simulation status', () => {
			expect(parsePaje(RECORD).status).to.be('start');
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
			expect(parsePaje(RECORD).type).to.be('paje');
		});

		it('should give the simulation status', () => {
			expect(parsePaje(RECORD).status).to.be('end');
		});
	});
});

describe('time diff', () => {
	const START = {
		type: 'paje',
		status: 'start',
		user: 'toto',
		date: new Date()
	};
	const END = {
		type: 'paje',
		status: 'end',
		user: 'toto',
		date: new Date()
	};

	it('should return nothing on a first end', () => {
		expect(handleSimulationEvent(END)).to.not.be.ok();
	});

	it('should return nothing on a first start', () => {
		expect(handleSimulationEvent(START)).to.not.be.ok();
	});

	it('should return a time diff on a first matching end', () => {
		expect(handleSimulationEvent(END)).to.be.a('number');
	});
});
