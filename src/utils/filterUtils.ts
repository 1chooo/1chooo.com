
export const handleItemClick = (
  value: string,
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>) => {
  setSelectedValue(value);
};

export const filterFunc = (selectedValue: string, data: any[]) => {
  return selectedValue === 'All'
    ? data
    : data.filter((item) => item.category.toLowerCase() === selectedValue.toLowerCase());
};
