class ArrayBoundsLimit extends Error {
  constructor(message) {
    super(message);
    this.name = 'ArrayBoundsLimit';
  }
}

module.exports = {
  ArrayBoundsLimit
}