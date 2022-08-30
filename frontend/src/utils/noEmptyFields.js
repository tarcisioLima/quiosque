
export const noEmptyFields = obj => {
    const updated = {};
  
    // eslint-disable-next-line no-restricted-syntax
    for (const key in obj) {
      if (obj[key] !== '' && obj[key] !== undefined && obj[key] !== null) {
        updated[key] = obj[key];
      }
    }

    return updated;
};

export default noEmptyFields;
