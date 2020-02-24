export const loadState = () => {
  // for user privacy - if it was disabled
  try {
    const serializedState = localStorage.getItem('state');

    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    // let reducer to initialize the app
    return undefined;
  }
};

type chat = {
  settings: object;
};

export const saveState = (state: chat) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Catch any errors to prevent crash app
    // Ignore write errors
  }
};
