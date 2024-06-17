import React, { useState } from 'react';
import Logo from './assets/rmbckg.png';
import './App.css';

const App = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [expenseItems, setExpenseItems] = useState([]);
  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState('');

  const addExpense = () => {
    if (newExpenseName && newExpenseAmount && !isNaN(newExpenseAmount)) {
      setExpenses(expenses + parseFloat(newExpenseAmount));
      setExpenseItems([...expenseItems, { name: newExpenseName, amount: newExpenseAmount }]);
      setNewExpenseName('');
      setNewExpenseAmount(0);
    }
  };

  const deleteExpense = (index) => {
    const updatedExpenses = [...expenseItems];
    const deletedItem = updatedExpenses.splice(index, 1)[0];
    setExpenses(expenses - deletedItem.amount);
    setExpenseItems(updatedExpenses);
  };

  const editExpense = (index) => {
    
    console.log('Editing expense:', expenseItems[index]);
  };

  const addIncome = () => {
    if (!isNaN(newExpenseAmount)) {
      setIncome(income + parseFloat(newExpenseAmount));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (!isNaN(newExpenseAmount)) {
        if (newExpenseAmount) {
          addExpense();
        } else if (income) {
          addIncome();
        }
      }
    }
  };

  const totalBalance = income - expenses;

  
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div>
      <div className='headers'>
        <header>
         <div className='bckg'>
          <img className='logoH' src={Logo} alt="logo" />
          </div>
          <h1>Welcome to CashFlow Master</h1>
          <h2>where you can track your expenses for {selectedMonth}</h2>
        </header>
      </div>
      <div className='monthSelector'>
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          {months.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>
      <div className='caculate'>
      <input className='incomein' type="number" placeholder='Enter your income here' value={income} onChange={(event) => setIncome(parseFloat(event.target.value))} />
        <br />
        <button onClick={addIncome}>Add Income</button>
        <br />
        <input className='expensename' type="text" placeholder='Enter expense name' value={newExpenseName} onChange={(event) => setNewExpenseName(event.target.value)} />
        <br />
        <input className='expanseout' type="number" placeholder='Enter your expense amount' value={newExpenseAmount} onChange={(event) => setNewExpenseAmount(parseFloat(event.target.value))} onKeyPress={handleKeyPress} />
        <br />
        <button onClick={addExpense}>Add Expense</button>
      </div>
      <div className='total'>
      <h3>Total Income: {income}</h3>
        <h3>Total Expenses : {expenses}</h3>
        <h3>Total Balance: {totalBalance}</h3>
        <div className='animatedbubbles'>
          {expenseItems.map((item, index) => (
            <div className='bubble' key={index}>
              <p>{item.name}: €{item.amount}</p>
              <button onClick={() => editExpense(index)}>Edit</button>
              <button onClick={() => deleteExpense(index)}>Delete</button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default App;
