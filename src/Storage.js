export const setLocalStorage = () => { localStorage.setItem('data', JSON.stringify(todoList.tasks)); }

export const reloadPage = () => { document.location.reload(); }

export const getLocalStorage = ( arrayStorage) => {
  if (localStorage.getItem('data') !== null) {
    return arrayStorage = JSON.parse(localStorage.getItem('data'));
  } else {
    return arrayStorage = [];
  }
}

