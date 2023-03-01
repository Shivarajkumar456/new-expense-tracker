import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import { Table } from 'react-bootstrap';
import './Expenses.css';

const Expenses = () => {
  const authCtx = useContext(AuthContext);
  const [data, setUserData] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [id, setId] = useState(null);
  const [isEditing, setisEditting] = useState(false);

  function onAmountHandler(event) {
    setAmount(event.target.value);
  }

  function onDescriptionHandler(event) {
    setDescription(event.target.value);
  }

  const onCategoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const auth = authCtx.email
    const replaceEmail = auth.replace('.', '')

    if (!isEditing) {
      fetch(`https://react-expense-tracker-bdc60-default-rtdb.firebaseio.com/${replaceEmail}.json`, {
        method: 'POST',
        body: JSON.stringify({ amount: amount, description: description, category: category }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      alert('Your Item added Successfully')
    } else {
      fetch(`https://react-expense-tracker-bdc60-default-rtdb.firebaseio.com/${authreplaced}/${id}.json`, {
        method: "PUT",
        body: JSON.stringify({
          amount: amount,
          category: category,
          description: description,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        alert("please Update Your Expence")
      });
      setisEditting(false)
    }
  }
  const auth = authCtx.email;
  const authreplaced = auth.replace('.', '');

  let UserData = [];
  useEffect(() => {

    fetch(`https://react-expense-tracker-bdc60-default-rtdb.firebaseio.com/${authreplaced}.json`, {
      method: 'GET',
    }).then(async (res) => {
      const res_1 = await res.json();
      // console.log(res)
      for (const key in res_1) {

        UserData.push({
          id: key,

          amount: res_1[key].amount,
          description: res_1[key].description,
          category: res_1[key].category,
        });
      }
      setUserData(UserData);
    })
  }, [UserData, authreplaced])

  const toDeleteDataHandler = (id) => {
    // console.log(id)
    fetch(`https://react-expense-tracker-bdc60-default-rtdb.firebaseio.com/${authreplaced}/${id}.json`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.ok) {
        alert("Your Item Delete Please Refresh The Page")
      }
    })
  }
  const editHandlerHandler = (id, amount1, category1, description1) => {
    setId(id)
    setAmount(amount1);
    setCategory(category1)
    setDescription(description1);
    setisEditting(true)
  }
  const cancelHandler = ()=> {
    setisEditting(false)
    setAmount('');
    setCategory('')
    setDescription('');
  }
  return (
    <div className="expense-tracker">
      <h1 className='heading'>Expense Tracker</h1>
      <form className='expenses-form' onSubmit={submitHandler}>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={onAmountHandler}
            required
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={onDescriptionHandler}
            required
          />
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={category} onChange={onCategoryHandler} required>
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Electricity</option>
            <option value="Salary">Entertainment</option>
            <option value="Salary">Furniture</option>
            <option value="Other">Other</option>
          </select>
        <button type="submit">Add Expense</button>
        {isEditing && <button type="button" onClick={cancelHandler}>Cancel</button>}
      </form>
      <h2 className='heading'>Expenses</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Edit</th>
            <th >Delete</th>
          </tr>
        </thead>

        {data.map((currvalue, index) => {
          return <tbody>
            <tr>
              <td>{index + 1}</td>

              <td>{currvalue.amount}</td>
              <td>{currvalue.category}</td>
              <td>{currvalue.description}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={editHandlerHandler.bind(null,
                    currvalue.id,
                    currvalue.amount,
                    currvalue.category,
                    currvalue.description,
                  )} >
                  Edit

                </button>
              </td>
              <button
                type="button"
                className="btn btn-danger"
                onClick={toDeleteDataHandler.bind(null,
                  currvalue.id)}
              >
                Delete
              </button>
            </tr>
          </tbody>
        })}

      </Table>
    </div>
  );
};

export default Expenses;
