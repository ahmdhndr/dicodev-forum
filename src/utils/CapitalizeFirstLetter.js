const capitalizeFirstLetter = (name) => {
  const arrayName = name.split(' ');
  for (let i = 0; i < arrayName.length; i += 1) {
    arrayName[i] = arrayName[i].charAt(0).toUpperCase() + arrayName[i].slice(1);
  }

  const capitalizedName = arrayName.join(' ');
  return capitalizedName;
};

export default capitalizeFirstLetter;
