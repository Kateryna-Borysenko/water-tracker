const modalLeftPosition = (offset, position) => {
  const left = Number(position) + Number(offset);
  if (left < 0) {
    console.log(left);
    return 0;
  } else {
    console.log(left);
    return left;
  }
};

export default modalLeftPosition;
