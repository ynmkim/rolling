function formatDate(createAt) {
  const date = new Date(createAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const formattedTwoDigitsMonth = month.toString().padStart(2, 0);
  const day = date.getDate();
  return `${year}.${formattedTwoDigitsMonth}.${day}`;
}

export default formatDate;
