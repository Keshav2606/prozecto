class ExampleModel {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.createdAt = new Date();
  }

  static findAll() {
    // Database query logic here
    return [];
  }

  static findById(id) {
    // Database query logic here
    return null;
  }

  save() {
    // Database save logic here
    return this;
  }
}

module.exports = ExampleModel;