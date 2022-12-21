import {put, call, fork, delay, all, takeEvery} from "redux-saga/effects";

import { 
  GET_METABOLITE, GET_METABOLITE_SUCCESS, GET_METABOLITE_ERROR,
  QUERY_METABOLITE, QUERY_METABOLITE_SUCCESS, QUERY_METABOLITE_ERROR,
  NOTIF_RESET, NOTIF_FLASH, NOTIF_SET_LOADING, NOTIF_REDIRECT
} from "../actions";
import {getApiCaller} from "./apiCaller";

function* handleFetchMetabolite(action) {
  try {
    const res = yield call(
      getApiCaller(),
      `GET metabolites/${action.mid}`
    );

    yield put({ type: GET_METABOLITE_SUCCESS, mid: action.mid, metabolite: res.metabolite });

    yield put({ type: NOTIF_SET_LOADING });
  } catch (err) {
    const statusCode = err.status;

    yield put({
      type: GET_METABOLITE_ERROR,
      mid: action.mid
    });

    let text = err.message || err.statusText || "Unknown error";
    if (action.pubchem_input) {
      text = `InChI/rMID wasn't found: ${action.mid} (source: Pubchem name query)`;
    } else if (statusCode === 404) {
      test = 'Metabolite not found.';
    }

    yield put({
      type: NOTIF_FLASH,
      theme: 'danger',
      text: text,
      code: err.code ? ('ERR ' + err.code) : null,
    });
  }
}

function* handleQueryMetabolite(action) {
  try {
    let res = null;

    if (action.attr === 'inchi' || action.attr === 'smiles') {
      // struct and attribute queries differ
      res = yield call(
        getApiCaller(),
        `POST metabolites/struct/${action.attr}`,
        {[action.attr]: action.value}
      );
    } else {
      res = yield call(
        getApiCaller(),
        `GET metabolites/by/${action.attr}/${action.value}`
      );
    }

    yield put({
      type: QUERY_METABOLITE_SUCCESS,
      mids: res.mids,
      metabolite: res.metabolite,

      direct_hit: res.query.direct_hit,
      attr: res.query.attr,
      value: res.query.value
    });

    if (res.query.direct_hit) {
      // redirect to metabolite page if search yielded a single result
      yield put({
        type: NOTIF_REDIRECT,
        to: '/metabolite/'+res.metabolite.mid
      });
    }

    yield put({ type: NOTIF_SET_LOADING });
  } catch (err) {
    yield put({ type: QUERY_METABOLITE_ERROR });

    yield put({
      type: NOTIF_FLASH,
      theme: 'danger',
      err: err.err,
      text: err.message || err.statusText || "Unknown error",
      code: err.code ? ('ERR ' + err.code) : null,
    });
  }
}

export default function* watchFetchRequest() {
  yield takeEvery(GET_METABOLITE, handleFetchMetabolite);
  yield takeEvery(action => action.type === QUERY_METABOLITE && action.attr !== "names", handleQueryMetabolite);
}

// export default function* metaboliteSaga() {
//   yield all([fork(watchFetchRequest)]);
// }
