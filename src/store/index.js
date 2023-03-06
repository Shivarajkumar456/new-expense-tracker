import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authReducer";
import ExpenseReducer from "./expenseReducer";
import PremiumReducer from "./premiumReducer";

const store = configureStore({
  reducer: { auth: AuthReducer, expense: ExpenseReducer, premium: PremiumReducer},
});
export default store;