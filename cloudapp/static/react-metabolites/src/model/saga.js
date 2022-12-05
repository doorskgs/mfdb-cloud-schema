import { fork, all } from 'redux-saga/effects'

import metaboliteSaga from './saga/metabolite.saga';

export default function* rootSaga() {
  yield all([
    fork(metaboliteSaga),
  ])
}
