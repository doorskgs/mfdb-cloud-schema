import {put, call, fork, delay, all, takeEvery} from "redux-saga/effects";

import { GET_METABOLITE, GET_METABOLITE_SUCCESS, GET_METABOLITE_ERROR } from "../actions";
import {getApiCaller} from "./apiCaller";

function* handleFetch(action) {
  try {
    //yield delay(2000);

    // console.log('saga action', action)

    const res = yield call(
      getApiCaller(),
      `GET metabolites?mid=${action.mid}`
    );

    yield put({type: GET_METABOLITE_SUCCESS, metabolite: res.metabolite});
  } catch (err) {
    yield put({type: GET_METABOLITE_ERROR, err: err.stack ?? "An unknown error occured"});
  }
}

export default function* watchFetchRequest() {
  yield takeEvery(GET_METABOLITE, handleFetch);
}

// export default function* metaboliteSaga() {
//   yield all([fork(watchFetchRequest)]);
// }
