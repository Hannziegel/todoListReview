export const setLocalStorage = (arrayStorage) => {
  localStorage.setItem('data', JSON.stringify(arrayStorage));
};

export const reloadPage = () => { document.location.reload(); };

export const getLocalStorage = () => {
  if (localStorage.getItem('data') !== null) {
    return JSON.parse(localStorage.getItem('data'));
  }
  return [];
};