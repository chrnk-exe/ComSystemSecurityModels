import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import matrixReducer from './slices/MatrixSlice'

export const store = configureStore({
	reducer: {
		matrix: matrixReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;