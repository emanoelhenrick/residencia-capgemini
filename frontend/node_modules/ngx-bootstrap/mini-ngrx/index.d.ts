import { BehaviorSubject, Observable, Observer, Operator } from 'rxjs';

/**
 * @copyright ngrx
 */

declare class MiniState<T> extends BehaviorSubject<T> {
    constructor(_initialState: T, actionsDispatcher$: Observable<Action>, reducer: ActionReducer<T>);
}

/**
 * @copyright ngrx
 */

declare class MiniStore<T> extends Observable<T> implements Observer<Action> {
    private _dispatcher;
    private _reducer;
    constructor(_dispatcher: Observer<Action>, _reducer: ActionReducer<any>, state$: Observable<any>);
    select<R>(pathOrMapFn: (state: T) => R): Observable<R>;
    lift<R>(operator: Operator<T, R>): MiniStore<R>;
    dispatch(action: Action): void;
    next(action: Action): void;
    error(err: any): void;
    complete(): void;
}

interface Action {
    type: string;
    payload?: any;
}
type ActionReducer<T> = (state: T, action: Action) => T;

export { MiniState, MiniStore };
export type { Action, ActionReducer };
