import expect from 'expect.js';

import { parsePaje } from './findPaje';


describe('non-paje simulations', () => {
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

describe('paje simulations', () => {
	const RECORD = [ 441,
		'01/07/2014',
		'10:02:55',
		'81.50.X.X',
		'DOSWEB',
		'PAJALLWEB',
		'9462cdb3cb9c194bdfe925c5628cc9222bc846950888f7d5db2e1832fd54aff6' ];

	it('should return an array', () => {
		expect(parsePaje(RECORD)).to.be.an('array');
	});
});
