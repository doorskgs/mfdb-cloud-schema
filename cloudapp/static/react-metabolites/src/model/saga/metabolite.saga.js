import {put, call, fork, delay, all, takeEvery} from "redux-saga/effects";

import { 
  GET_METABOLITE, GET_METABOLITE_SUCCESS, GET_METABOLITE_ERROR,
  QUERY_METABOLITE, QUERY_METABOLITE_SUCCESS, QUERY_METABOLITE_ERROR,
  NOTIF_API_ERROR, NOTIF_RESET
} from "../actions";
import {getApiCaller} from "./apiCaller";

function* handleFetchMetabolite(action) {
  try {
    const res = yield call(
      getApiCaller(),
      `GET metabolites/${action.mid}`
    );

    yield put({ type: GET_METABOLITE_SUCCESS, mid: action.mid, metabolite: res.metabolite });

    yield put({ type: NOTIF_RESET });
  } catch (err) {
    yield put({ type: GET_METABOLITE_ERROR, mid: action.mid });

    yield put({
      type: NOTIF_API_ERROR,
      status: err.status ?? null,
      err: err.stack ?? null,
      message: err.message ?? err.statusText
    });
  }
}


function* handleQueryMetabolite(action) {
  try {
    const res = yield call(
      getApiCaller(),
      `GET metabolites/by/${action.attr}/${action.value}`
    );

    yield put({ type: QUERY_METABOLITE_SUCCESS, mid: action.mid, metabolite: res.metabolite });

    yield put({ type: NOTIF_RESET });
  } catch (err) {
    yield put({ type: QUERY_METABOLITE_ERROR, mid: action.mid });

    yield put({
      type: NOTIF_API_ERROR,
      status: err.status ?? null,
      err: err.stack ?? null,
      message: err.message ?? err.statusText
    });
  }
}

export default function* watchFetchRequest() {
  yield takeEvery(GET_METABOLITE, handleFetchMetabolite);
  yield takeEvery(QUERY_METABOLITE, handleQueryMetabolite);
}

// export default function* metaboliteSaga() {
//   yield all([fork(watchFetchRequest)]);
// }
