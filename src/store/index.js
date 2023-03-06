import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authReducer";
import ExpenseReducer from "./expenseReducer";

const store = configureStore({
  reducer: { auth: AuthReducer, expense: ExpenseReducer },
});
export default store;