import { of, EMPTY } from "rxjs";
import { tap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { SIGN_UP } from "../actions";

export const signupEpic = (action$, state$) =>
  action$.pipe(ofType(SIGN_UP), tap(console.log.bind(null, "SIGN_UP")));
