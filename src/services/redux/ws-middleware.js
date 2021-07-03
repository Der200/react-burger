import { getCookie } from "./authorization-slice/authorization-slice";

export const socketMiddleware = (wsUrl, wsActions, authFlag) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { onInit, onOpen, onClose, onError, onMessage, wsClose } = wsActions;
      const token = authFlag ? getCookie('accessToken') : null;

      if (type === onInit.toString()) {
            // объект класса WebSocket
        socket = token ? new WebSocket(`${wsUrl}?token=${token}`) : new WebSocket(wsUrl);
      }
      
      if (type === wsClose.toString()) {
        socket && socket.close()
      }
      if (socket) {

        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData} = parsedData
          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
          socket.close()
          
        };

        if (type === 'WS_SEND_MESSAGE') {
          const message = payload;
          
          socket.send(JSON.stringify(message));
        }

      }

      next(action);
    };
  };
}; 