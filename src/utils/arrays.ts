/**
 * Convert an array of strings into a nested object
 *
 * @example arrayToNestedObject(['a', 'b', 'c', 'd'], 5) => {"a":{"b":{"c":{"d":5}}}}
 *
 * @param array
 * @param value
 * @see https://stackoverflow.com/a/31190228/2391795
 */
export const arrayToNestedObject = (array: string[], value: any) => {
  return array.reduceRight(function (acc, datum) {
    const val = {};

    val[datum] = acc;

    return val;
  }, value);
};
