export const customMiddlewareLogger = () => next => action => {
  if (action.payload) {
    console.log(`%c ${action.type}:`, 'color: #9EBBFF', action.payload);
  }
  return next(action);
};
