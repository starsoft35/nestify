import io from 'socket.io-client';
import config from '@/config';

export default {
  namespace: 'status',

  state: {
    status: [],
    fileChangeList: [],
  },

  effects: {
    *onFileChange({ payload }, { put, select }) {
      const fileChangeList = yield select((state) => state.status.fileChangeList);

      fileChangeList.push(payload);

      if (fileChangeList.length > 5) {
        fileChangeList.shift();
      }

      yield put({
        type: 'set',
        payload: { fileChangeList },
      });
    },
  },

  subscriptions: {
    onConnection({ dispatch, history }) {
      let client = null;
      history.listen((location) => {
        if ('/studio' === location.pathname) {
          client = io(`${config.SOCKET_ROOT}/status`);

          client.on('connect', (socket) => {
            console.log(`================ on ${client.id} connect`, client);

            client.on('status', (status) => {
              dispatch({
                type: 'set',
                payload: {
                  status,
                },
              });
            });

            // client.on('fileChange', (data) => {
            //   dispatch({
            //     type: 'onFileChange',
            //     payload: data,
            //   });
            // });
          });
        } else {
          !!client && client.close();
        }
      });
    },
  },

  reducers: {
    set(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
