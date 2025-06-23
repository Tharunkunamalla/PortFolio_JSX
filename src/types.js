// Type definitions converted to JSDoc comments for better IDE support

/**
 * @typedef {Object} Project
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string} image
 * @property {string[]} technologies
 * @property {string} liveLink
 * @property {string} codeLink
 */

/**
 * @typedef {Object} AboutItem
 * @property {string} name
 * @property {string} [date]
 * @property {string} [description]
 */

/**
 * @typedef {Object} AboutBox
 * @property {number} id
 * @property {string} title
 * @property {AboutItem[]} items
 */

/**
 * @typedef {Object} Skill
 * @property {string} name
 * @property {React.ReactNode} icon
 * @property {number} level
 * @property {'frontend'|'backend'|'tools'|'other'} category
 */

export {};