
export type Condition = () => boolean | string


export interface TestConditionOptions {
	testName: string,
	valueName: string,
	pluralValueName?: string
}

export const defaultTestConditionOptions: TestConditionOptions = {
	testName: 'Verification',
	valueName: 'Variable'
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const testCondition = <TFn extends Function>(
	fn: TFn,
	values: { [key: string]: unknown },
	condition: Condition,
	options: Partial<TestConditionOptions> = {}
): void => {
	const conditionResult = condition()
	if (typeof conditionResult == 'boolean' && conditionResult)
		return

	const { testName, valueName, pluralValueName } = getTestConditionOptions(options)
	const fnName = fn.name
	const conditionBody = getConditionBody(fnName, condition)
	const valueNames = Object.keys(values)
		.filter(name => containsIdent(conditionBody, name))
	const valueExpr = valueNames.length == 1
		? valueNames[0]
		: valueNames.slice(0, -1).join('\', \'') +
		`' and '${valueNames[valueNames.length - 1]}`
	const valuePrefix = valueNames.length <= 1 ? valueName : pluralValueName

	let conditionMessage = ''
	if (typeof conditionResult == 'boolean')
		conditionMessage = `${valuePrefix} '${valueExpr}' ` +
			`should satisfy expression '${conditionBody}'`
	else {
		if (conditionResult.startsWith(valuePrefix))
			conditionMessage = conditionResult
		else if (conditionResult.startsWith('should'))
			conditionMessage = `${valuePrefix} '${valueExpr}' ${conditionResult}`
		else
			conditionMessage = `${valuePrefix} '${valueExpr}' ` +
				`should ${conditionResult}`
	}

	let valuesMessage = ''
	if (valueNames.length > 0) {
		const argValues = valueNames.map(name =>
			`${name} = ${JSON.stringify(values[name])}`)
		valuesMessage = `\n  ${valueName} values: ${argValues.join(', ')}`
	}

	throw new Error(
		`${testName} failure in function '${fnName}'.\n` +
		`  ${conditionMessage}.${valuesMessage}`)
}


const getTestConditionOptions = (
	options: Partial<TestConditionOptions>
): Required<TestConditionOptions> => {
	const { testName, valueName, pluralValueName } = {
		...defaultTestConditionOptions,
		...options
	}
	return {
		testName,
		valueName,
		pluralValueName: pluralValueName ?? `${valueName}s`
	}
}


const getConditionBody = (fnName: string, condition: Condition): string => {
	const prefix = '() =>'
	const expr = condition.toString()
	if (!expr.startsWith(prefix))
		throw new Error(
			`Condition error in function '${fnName}'.\n` +
			`  Condition '${expr}' is invalid - it should be an arrow function with no arguments.`)
	return expr.slice(prefix.length).trim()
}


const nonIdentExpr = '[^a-zA-Z0-9_$]'

const containsIdent = (code: string, ident: string): boolean => {
	const begAndEnd = `^${ident}$`
	const beg = `^${ident}${nonIdentExpr}`
	const end = `${nonIdentExpr}${ident}$`
	const middle = `${nonIdentExpr}${ident}${nonIdentExpr}`
	const identExpr = new RegExp(`${begAndEnd}|${beg}|${end}|${middle}`)
	return identExpr.test(code)
}
