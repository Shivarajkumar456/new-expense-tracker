import {  useEffect, useRef, useState } from 'react';
import ExpenseItem from './ExpenseItem';
import { useSelector, useDispatch } from 'react-redux';
import { expenseAction } from '../../store/expenseReducer';
import './Expenses.css';

const Expenses = () => {
  const [id, setId] = useState(null);
  const [editAmount, setEditAmount] = useState(null)
  const dispatch = useDispatch();
  const inputAmountRef = useRef();
  const inputDescRef = useRef();
  const inputCatRef = useRef();
  const expenses = useSelector(state => state.expense.expenses);
  const totalAmount = useSelector(state => state.expense.totalAmount);
  const email = useSelector(state=> state.auth.email);
  const isEditing = useSelector(state=>state.expense.isEditing);
  const expenseEmail = email.replace('.','');

  const deleteHandler = (item)=> {
    const updatedExpenses = expenses.filter((expense)=> { return expense.id !== item.id });
    const updatedTotalAmount = Number(totalAmount) - Number(item.amount);
    dispatch(expenseAction.removeExpense({
      expenses: updatedExpenses,
      totalAmount: updatedTotalAmount
    }))
  };

  const editExpeseHandler = (item)=> {
    dispatch(expenseAction.editing(true))
    setId(item.id);
    setEditAmount(item.amount)
    inputAmountRef.current.value= item.amount
    inputDescRef.current.value= item.description
    inputCatRef.current.value = item.category
  };

  const addExpenseHandler = async(event) => {
    event.preventDefault();
    const obj = {
      amount: inputAmountRef.current.value,
      description: inputDescRef.current.value,
      category: inputCatRef.current.value
    }
    
    if(isEditing){
      try{
        const res = await fetch(`https://react-expense-tracker-bdc60-default-rtdb.firebaseio.com/${expenseEmail}/${id}.json`, {
          method: 'PUT',
          body : JSON.stringify(obj),
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const data = await res.json();
        if(res.ok){
          alert('Expenses updated successfully!');
          const editData = {...obj}
          dispatch(expenseAction.addExpense({
            expenses: editData,
            totalAmount: editData.amount - Number(editAmount),
          }));
          dispatch(expenseAction.editing(false));
        }else{
          throw data.error;
        }
      }catch(e){
        console.log(e);
    }
    }
    else{
    try{
      const res = await fetch(`https://react-expense-tracker-bdc60-default-rtdb.firebaseio.com/${expenseEmail}.json`,{
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Contetnt-Type':'application/json'
        }
      });
      const data = await res.json();
      if(res.ok){
        alert('Expense Added Successfully');
        const newData = {...obj}
        dispatch(expenseAction.addExpense({
          expenses: newData,
          totalAmount: newData.amount
        }));
    }else{
      throw data.error;
    }
    }catch(e){
      console.log(e);
    }
  }
    inputAmountRef.current.value=""
    inputDescRef.current.value=""
    inputCatRef.current.value=""
  }
  const newdata = [];
  useEffect(() => {
    async function fetchExpenses(){
    try {
      const res = await fetch(
        `https://react-expense-tracker-bdc60-default-rtdb.firebaseio.com/${expenseEmail}.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        let updatedtotalAmount =0;
        
        for (let key in data) {
          newdata.push({ id: key, ...data[key] });
          updatedtotalAmount += Number(data[key].amount)
        }
        dispatch(
        expenseAction.replaceExpenses({
          expenses : newdata,
          totalAmount : updatedtotalAmount
        })
        )

      } else {
        throw data.error;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  fetchExpenses()
   }, [dispatch,expenseEmail, newdata]);

   const cancelHandler = ()=>{
    dispatch(expenseAction.editing(false));
    inputAmountRef.current.value=""
    inputDescRef.current.value=""
    inputCatRef.current.value=""
   }

   return <>
    <div className="expense-tracker">
       <h1 className='heading'>Expense Tracker</h1>
       <form className='expenses-form' onSubmit={addExpenseHandler}>
           <label htmlFor="amount">Amount</label>
         <input
            type="number"
            id="amount"
            name="amount"
            ref={inputAmountRef}
            required
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            ref={inputDescRef}
            required
          />
          <label htmlFor="category">Category</label>
          <select id="category" name="category" ref={inputCatRef} required>
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>
        <button type="submit">Add Expense</button>
        {isEditing && <button onClick={cancelHandler}>Cancel</button>}
      </form>
      <h2 className='heading'>Expenses</h2>
      <div className="expenses-list">
            {expenses.map((expense) => (
              <ExpenseItem
              key={expense.id}
                id={expense.id}
                item={expense}
                deleteItem={deleteHandler}
                editItem={editExpeseHandler}
              />
            ))}

            <div className='totalAmount'>Total Amount :{totalAmount}</div>
          </div>
      </div>
   </>

}

export default Expenses;