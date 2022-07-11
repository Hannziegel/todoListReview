export const setLocalStorage = (arrayStorage) => {
  localStorage.setItem('data', JSON.stringify(arrayStorage));
  return;
};

export const reloadPage = () => { document.location.reload(); };

export const getLocalStorage = (arrayStorage) => {
  if (localStorage.getItem('data') !== null) {
    JSON.parse(localStorage.getItem('data'));
    return;
  } else {
    arrayStorage = [];
    return;
  };
};