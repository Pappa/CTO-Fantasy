import { EMPTY } from "rxjs";
import { tap, switchMapTo } from "rxjs/operators";
import { ofType } from "redux-observable";
import { LOGIN_AS_GUEST } from "../actions";

export const signupEpic = (action$, state$) =>
  action$.pipe(
    ofType(LOGIN_AS_GUEST),
    tap(console.log.bind(null)),
    switchMapTo(EMPTY)
  );
