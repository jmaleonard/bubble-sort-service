class ArrayBoundsLimitError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ArrayBoundsLimit';
  }
}

module.exports = {
  ArrayBoundsLimitError
}