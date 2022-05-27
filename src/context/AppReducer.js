export default (state, action) => {
  switch (action.type) {
    case "PAGE_CHANGE":
      return { ...state, stage: action.payload };
    default:
      return state;
  }
};
