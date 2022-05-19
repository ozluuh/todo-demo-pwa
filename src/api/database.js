const TASKS_KEY = "tasks";

export const store = (data) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(data));
};

export const index = () => {
  const response = localStorage.getItem(TASKS_KEY);

  if (response === null) return [];

  return JSON.parse(response);
};

export const clear = () => {
  localStorage.removeItem(TASKS_KEY);
};
