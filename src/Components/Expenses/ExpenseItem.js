import React from 'react';
import { useSelector } from 'react-redux';
import './ExpenseItem.css'

const ExpenseItem = (props) => {
    const email = useSelector(state => state.auth.email);
    const expenseEmail = email.replace('.','');
    const deleteHandler = async (event) => {
        event.preventDefault();
        try {
            console.log(props.item)
            const res = await fetch(`https://react-expense-tracker-bdc60-default-rtdb.firebaseio.com/${expenseEmail}/${props.item.id}.json`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
            const data = await res.json();

            if (res.ok) {
                alert("Expense Deleted Successfully")
                props.deleteItem(props.item)

            } else {
                console.log(props.item)
                throw data.error
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const editHandler = async (event) => {
        event.preventDefault();
        try {
            const res = await fetch(`https://react-expense-tracker-bdc60-default-rtdb.firebaseio.com/${expenseEmail}/${props.item.id}.json`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
            const data = await res.json();

            if (res.ok) {
                console.log(props.item)
                props.editItem(props.item)

            } else {
                throw data.error
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (<>
        <li className='list'> 
        <b>Category</b> :-{props.item.category} 
        <b>Amount</b>:-${props.item.amount} 
        <b>Description</b>:-{props.item.description} 
        <button className='edit-button' onClick={editHandler}>Edit</button> 
        <button className='delete-button' onClick={deleteHandler}>Delete</button> 
        </li>
        {/* <li><span>{props.item.amount}</span>  
        <span>{props.item.description}</span> 
         <span> {props.item.category}</span> `
        <button onClick={editHandler}>Edit</button>   
        <button onClick={deleteHandler}>Delete</button> </li>  */}
    </>
    )
}

export default ExpenseItem