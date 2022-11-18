/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
export default {
	clearMocks: true,
	collectCoverage: true,
	collectCoverageFrom: [
		'src/**/*.ts',
		'!src/**/index.ts',
		'!src/extensions.ts'
	],
	coverageDirectory: 'tools/coverage-results',
	coverageProvider: 'v8',
	preset: 'ts-jest',
	roots: ['src', 'tests'],
	testEnvironment: 'jest-environment-node',
	testMatch: ['**/tests/**/*.test.ts'],
	verbose: true
}
