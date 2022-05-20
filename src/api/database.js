export const store = ({ key, data }) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const index = (key) => {
  const response = localStorage.getItem(key);

  if (response === null) return [];

  return JSON.parse(response);
};

export const clear = (key) => {
  localStorage.removeItem(key);
};

export const item = (key) => {
  const response = localStorage.getItem(key);

  if (response === null) return null;

  return response;
};
