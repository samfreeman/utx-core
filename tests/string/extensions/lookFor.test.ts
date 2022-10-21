
import { NotFound } from '../../../string/lookFor'
import '../../../string/extensions/lookFor'


describe('string-extensions', () => {
	test('lookFor', () => {
		expect(''.lookFor('')).toEqual(NotFound)
		expect('JoeBob'.lookFor('a')).toEqual(NotFound)
		expect('JoeBob'.lookFor('o')).toEqual([1, 1])
		expect('JoeBob'.lookFor('e')).toEqual([2, 1])
		expect('JoeBob'.lookFor('E')).toEqual(NotFound)
		expect('JoeBob'.lookFor(/ebo/i)).toEqual([2, 3])
		expect('JoeBob'.lookFor(/ebo/)).toEqual(NotFound)
		expect('JoeBob'.lookFor('Bob', -7)).toEqual([3, 3])
		expect('JoeBob'.lookFor('Bob', -6)).toEqual([3, 3])
		expect('JoeBob'.lookFor('Bob', -5)).toEqual([3, 3])
		expect('JoeBob'.lookFor('Bob', -4)).toEqual([3, 3])
		expect('JoeBob'.lookFor('Bob', -3)).toEqual([3, 3])
		expect('JoeBob'.lookFor('Bob', -2)).toEqual(NotFound)
		expect('JoeBob'.lookFor('Bob', -1)).toEqual(NotFound)
		expect('JoeBob'.lookFor('Bob', 0)).toEqual([3, 3])
		expect('JoeBob'.lookFor('Bob', 1)).toEqual([3, 3])
		expect('JoeBob'.lookFor('Bob', 2)).toEqual([3, 3])
		expect('JoeBob'.lookFor('Bob', 3)).toEqual([3, 3])
		expect('JoeBob'.lookFor('Bob', 4)).toEqual(NotFound)
		expect('JoeBob'.lookFor('Bob', 5)).toEqual(NotFound)
		expect('JoeBob'.lookFor('Bob', 6)).toEqual(NotFound)
		expect('JoeBob'.lookFor('Bob', 7)).toEqual(NotFound)

		expect((() => { }).toString().lookFor('(')).toEqual([0, 1])

		expect('JoeBob'.lookFor(/ebo/i, 1)).toEqual([2, 3])
	})
})
