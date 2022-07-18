const validation = (schema) => (values) => {
  const { error } = schema.validate(values);

  if (error) {
    const [code, message] = error.message.split('|');
    return [code, message];
  }
};

module.exports = validation;