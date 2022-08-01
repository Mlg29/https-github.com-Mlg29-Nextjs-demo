import {Action, configureStore, ThunkAction, combineReducers, AnyAction} from "@reduxjs/toolkit"
import AuthReducer from "../slices/AuthSlice";
import StoreReducer from "../slices/StoreSlice"
import ProductReducer from "../slices/ProductSlice"
import OrderReducer from "../slices/OrderSlice"
import  PayoutReducer from "../slices/PayoutSlice"
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import ProfileReducer from "../slices/ProfileSlice"
import NotificationReducer from "../slices/NotificationSlice";
import StaffReducer from "../slices/StaffSlice"

const combinedReducer = combineReducers({
    auth: AuthReducer,
    store: StoreReducer,
    products: ProductReducer,
    orders: OrderReducer,
    payouts: PayoutReducer,
    profiles: ProfileReducer,
    notifications: NotificationReducer,
    staff: StaffReducer,
})

const reducer = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => {
    if (action.type === HYDRATE) {
      const nextState = {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      };
      return nextState;
    } else {
      return combinedReducer(state, action);
    }
  };


export const makeStore = () => configureStore({reducer});

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export const wrapper = createWrapper(makeStore, {debug: true})