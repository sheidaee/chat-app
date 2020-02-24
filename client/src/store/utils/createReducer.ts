import { ChatActionTypes } from '../../features/chat/types';

export default (initialState: object) => (reducerMap: any) => (
  state = initialState,
  action: ChatActionTypes
) => {
  const reducer = reducerMap[action.type];
  return reducer ? reducer(state, action) : state;
};
