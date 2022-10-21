/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

import { Config } from 'jest'


const config: Config = {
	clearMocks: true,
	collectCoverage: true,
	collectCoverageFrom: [
		'src/**/*.ts',
		'!src/**/index.ts',
		'!src/**/*.test.ts'
	],
	coverageDirectory: 'tools/coverage-results',
	coverageProvider: 'v8',
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-node',
	testMatch: ['tests/**/*.test.ts'],
	verbose: true
}

export default config
