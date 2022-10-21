
import { lookFor, NotFound } from '../../src/string/lookFor'


describe('string', () => {
    test('lookFor', () => {
        expect(lookFor('', '')).toEqual(NotFound)
        expect(lookFor('JoeBob', 'a')).toEqual(NotFound)
        expect(lookFor('JoeBob', 'o')).toEqual([1, 1])
        expect(lookFor('JoeBob', 'e')).toEqual([2, 1])
        expect(lookFor('JoeBob', 'E')).toEqual(NotFound)
        expect(lookFor('JoeBob', /ebo/i)).toEqual([2, 3])
        expect(lookFor('JoeBob', /ebo/)).toEqual(NotFound)
        expect(lookFor('JoeBob', 'Bob', -7)).toEqual([3, 3])
        expect(lookFor('JoeBob', 'Bob', -6)).toEqual([3, 3])
        expect(lookFor('JoeBob', 'Bob', -5)).toEqual([3, 3])
        expect(lookFor('JoeBob', 'Bob', -4)).toEqual([3, 3])
        expect(lookFor('JoeBob', 'Bob', -3)).toEqual([3, 3])
        expect(lookFor('JoeBob', 'Bob', -2)).toEqual(NotFound)
        expect(lookFor('JoeBob', 'Bob', -1)).toEqual(NotFound)
        expect(lookFor('JoeBob', 'Bob', 0)).toEqual([3, 3])
        expect(lookFor('JoeBob', 'Bob', 1)).toEqual([3, 3])
        expect(lookFor('JoeBob', 'Bob', 2)).toEqual([3, 3])
        expect(lookFor('JoeBob', 'Bob', 3)).toEqual([3, 3])
        expect(lookFor('JoeBob', 'Bob', 4)).toEqual(NotFound)
        expect(lookFor('JoeBob', 'Bob', 5)).toEqual(NotFound)
        expect(lookFor('JoeBob', 'Bob', 6)).toEqual(NotFound)
        expect(lookFor('JoeBob', 'Bob', 7)).toEqual(NotFound)

        expect(lookFor((() => { }).toString(), '(')).toEqual([0, 1])

        expect(lookFor('JoeBob', /ebo/i, 1)).toEqual([2, 3])
    })
})
