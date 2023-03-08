import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {expenses :[], totalAmount:0,firstTime:true, isEditing:false}
const expenseSlice = createSlice({

    name:'expenses',
    initialState:initialExpenseState,
    reducers :{
        replaceExpenses(state,action)
        {
            state.expenses = action.payload.expenses;
            state.totalAmount = Number(action.payload.totalAmount)
        },
        addExpense(state,action)
        {
            state.expenses=[...state.expenses,action.payload.expenses];
            state.totalAmount = Number(state.totalAmount) + Number (action.payload.totalAmount)
        },
        removeExpense(state,action)
        {
            state.expenses = action.payload.expenses
            state.totalAmount = state.payload.totalAmount
        },
        editing(state, action) {
            state.isEditing = action.payload;
        }
    }

})
export default expenseSlice.reducer
export const expenseAction = expenseSlice.actions;