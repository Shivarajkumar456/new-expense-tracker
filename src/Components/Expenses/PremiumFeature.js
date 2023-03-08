import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Premium.css'
import { premiumActions } from '../../store/premiumReducer';

const PremiumFeature = () => {
  const dispatch = useDispatch();
  const expenseList = useSelector((state) => state.expense.expenses);
  const activatePremium = useSelector((state) => state.premium.premium);
  const showPremium = useSelector(state => state.premium.premiumShow);
  const totalAmount = useSelector((state) => state.expense.totalAmount);
  const premiumMode = useSelector((state) => state.premium.theme);

  // creating the csv file to download
  const title = ['Category', 'Amount', 'Description'];
  const data = [title];

  expenseList.forEach((item) => {
    data.push([item.category, item.amount, item.description ,]);
  });

  const creatingCSV = data.map((row) => row.join(',')).join('\n');
  const blob = new Blob([creatingCSV]);

  // dark mode handler
  const darkModeHandler = () => {
    if (premiumMode === 'light') {
      dispatch(premiumActions.dark());
    } else {
      dispatch(premiumActions.light());
    }
  };

  if (totalAmount <= 10000 && activatePremium) {
    dispatch(premiumActions.light());
    dispatch(premiumActions.premium(false));
  }

  const closeHandler = ()=> {
    dispatch(premiumActions.showPremium(false))
  }
  return (
    <React.Fragment>
      {totalAmount > 10000 && (
        <div className="activate">
          {activatePremium && showPremium && (
            <div>
              <button onClick={darkModeHandler}>
                {premiumMode === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
              <a href={URL.createObjectURL(blob)} download='expenses.csv'>
                Download Your Expenses
              </a>
              <button onClick={closeHandler}>Close</button>
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default PremiumFeature;