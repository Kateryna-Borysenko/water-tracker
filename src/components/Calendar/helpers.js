const modalLeftPosition = (offset, position) => {
  const left = Number(position) + Number(offset);
  if (left < 0) {
    return 0;
  } else {
    return left;
  }
};

export default modalLeftPosition;
