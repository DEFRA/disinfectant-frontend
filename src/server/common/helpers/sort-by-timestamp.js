/**
 * Sorts two objects by their timestamp property in ascending order.
 * @param {Object} a - The first object to compare.
 * @param {Object} b - The second object to compare.
 * @returns {number} - A positive number if a.timestamp is greater than b.timestamp, a negative number if a.timestamp is less than b.timestamp, or 0 if they are equal.
 */
function sortByTimestampAsc(a, b) {
  if (a.timestamp > b.timestamp) {
    return 1
  }

  if (a.timestamp < b.timestamp) {
    return -1
  }

  return 0
}

/**
 * Sorts an array of objects by timestamp in descending order.
 *
 * @param {Object} a - The first object to compare.
 * @param {Object} b - The second object to compare.
 * @returns {number} - A positive number if a should be placed after b, a negative number if a should be placed before b, or 0 if they have the same timestamp.
 */
function sortByTimestampDesc(a, b) {
  if (a.timestamp < b.timestamp) {
    return 1
  }

  if (a.timestamp > b.timestamp) {
    return -1
  }

  return 0
}

/**
 * Sorts an array of objects by their timestamp property.
 * @param {string} direction - The sorting direction. Can be 'asc' for ascending or 'desc' for descending. Defaults to 'desc'.
 * @returns {function} - The sorting function based on the specified direction.
 */
function sortByTimestamp(direction = 'desc') {
  if (direction === 'asc') {
    return sortByTimestampAsc
  }

  if (direction === 'desc') {
    return sortByTimestampDesc
  }
}

export { sortByTimestamp }
