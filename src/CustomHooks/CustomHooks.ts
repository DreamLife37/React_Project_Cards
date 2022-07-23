import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatchType, AppStoreType} from "../pages/app/store";

export const useDispatchApp: () => AppDispatchType = useDispatch

export const useSelectorApp: TypedUseSelectorHook<AppStoreType> = useSelector
