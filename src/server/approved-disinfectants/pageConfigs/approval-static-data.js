/**
 * Represents the approval data transfer object.
 * @typedef {Object} ApprovalDTO
 * @property {string} value - The value of the approval.
 * @property {string} text - The text description of the approval.
 */

/**
 * Array of approval data transfer objects.
 * @type {ApprovalDTO[]}
 */
const approvalDTO = [
  {
    value: 'fmdo',
    text: 'Foot and Mouth Disease Orders (FMDO)'
  },
  {
    value: 'svdo',
    text: 'Swine Vesicular Disease Orders (SVDO)'
  },
  {
    value: 'dop',
    text: 'Diseases of Poultry Order and the Avian Influenza and Influenza of Avian Origin in Mammals Order (DoP, AI & IAOM)'
  },
  {
    value: 'tbo',
    text: 'Tuberculosis Orders (TBO)'
  },
  {
    value: 'go',
    text: 'General Orders (GO)'
  }
]

export { approvalDTO }
