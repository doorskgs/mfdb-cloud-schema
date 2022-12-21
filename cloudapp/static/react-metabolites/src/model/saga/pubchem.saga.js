import {put, call, fork, delay, all, takeEvery} from "redux-saga/effects";

import { QUERY_METABOLITE, QUERY_METABOLITE_SUCCESS, QUERY_METABOLITE_ERROR, NOTIF_FLASH, GET_METABOLITE } from "../actions";
import { getApiCaller } from "./apiCaller";

const pubchem_attr_to_namespace = {
  'names': 'name'
};

function* handlePubchemQuery(action) {

 try {
    const ns = pubchem_attr_to_namespace[action.attr];

    if (!ns) {
      throw new Error("Attribute not supported with pubchem api: " + action.attr);
    }

    const res = yield call(
      getApiCaller('pubchem'),
      `GET compound/${ns}/${action.value}/json`
    );

    if (res) {
      const inchikey = res.PC_Compounds[0].props.filter(p=>p.urn.label === "InChIKey").map(p=>p.value.sval)[0] || null;

      if (inchikey) {
        // now that pubchem entry has been resolved, yield a second attribute query from our own API
        yield put({ type: GET_METABOLITE, mid: inchikey, pubchem_input: true });
      } else {
        // ikey not found
        throw Error("not found inchikey");
      }
    }

  } catch (err) {
    yield put({
      type: QUERY_METABOLITE_ERROR,
      attr: "inchikey",
      status: err.status
     });

    yield put({
      type: NOTIF_FLASH,
      theme: 'danger',
      text: err.status == 404 ? "Not found" : "Unknown pubchem error",
      code: err.status,
    });
  }
}

export default function* watchFetchRequest() {
  yield takeEvery(action => action.type === QUERY_METABOLITE && action.attr === "names", handlePubchemQuery);
}