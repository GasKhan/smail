export const getFormattedDate = (date: any) => {
  const d = new Date(date);
  return `${d.getDay()}.${d.getMonth()}.${d.getFullYear()}`;
};
