export const transformer = function (arr) {
  const options = arr.map((el) => {
    return {
      value: `${(el.fullName || el.name).toLowerCase().split(" ").join("-")}-${
        el.id
      }`,

      label: el.fullName || el.name,
    };
  });

  return options;
};
