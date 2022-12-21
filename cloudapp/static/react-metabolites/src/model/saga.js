import { fork, all } from 'redux-saga/effects'

import metaboliteSaga from './saga/metabolite.saga';
import pubchemSaga from './saga/pubchem.saga';

export default function* rootSaga() {
  yield all([
    fork(metaboliteSaga),
    fork(pubchemSaga),
  ])
}
