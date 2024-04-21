export const customMiddlewareLogger = () => next => action => {
  if (action.payload) {
    `%c ${action.type}:`, 'color: #9EBBFF', action.payload;
  }
  return next(action);
};
