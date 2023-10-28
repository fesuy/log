/**
 * Pad zero into number
 * @param  number
 * @returns string
 */
export default function(number) {
  let numbers = (number + '').split('')

    while (numbers.length < 2)
        numbers.unshift('0')

    return numbers.join('');
}
