
import { undefinedString, nullString } from './helpers'

import { NotFound }	from '../../src/string/types'
import { lookForLast }	from '../../src/string/lookForLast'


describe('string', () => {
	test('lookForLast', () => {
		expect(lookForLast(undefinedString, '')).toEqual(NotFound)
		expect(lookForLast(undefinedString, 'a')).toEqual(NotFound)
		expect(lookForLast(nullString, '')).toEqual(NotFound)
		expect(lookForLast(nullString, 'a')).toEqual(NotFound)
		
		expect(lookForLast('JoeBob', '')).toEqual(NotFound)
		expect(lookForLast('JoeBob', 'a')).toEqual(NotFound)
		expect(lookForLast('JoeBob', 'o')).toEqual([4, 1])
		expect(lookForLast('JoeBob', 'e')).toEqual([2, 1])
		expect(lookForLast('JoeBob', 'E')).toEqual(NotFound)
		expect(lookForLast('JoeBob', /ebo/i)).toEqual([2, 3])
		expect(lookForLast('JoeBob', /ebo/)).toEqual(NotFound)
		expect(lookForLast('JoeBobJoeBob', /ebo/i)).toEqual([8, 3])
	})
})
