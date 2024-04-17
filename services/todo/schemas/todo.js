module.exports = {
  type: 'object',
  properties: {
    todo: { type: 'string' },
    status: { type: 'string' }
  },
  required: ['todo'],
  additionalProperties: false
}
