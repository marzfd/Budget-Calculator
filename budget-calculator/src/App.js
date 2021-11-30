import logo from './logo.svg';
import { useState, useEffect } from 'react';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import {v4 as uuid} from 'uuid';
import './App.css';

// const initialExpenses = [
  // { id: uuid(), charge: 'Rent', amount: 1500 },
  // { id: uuid(), charge: 'Coffee', amount: 300 },
  // { id: uuid(), charge: 'Gym', amount: 400 },
// ];

const initialExpenses = localStorage.getItem('expenses')
  ? JSON.parse(localStorage.getItem('expenses'))
  : [];

function App() {

  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleCharge = e => setCharge(e.target.value);
  const handleAmount = e => setAmount(e.target.value);

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== '' && amount > 0) {
      if (edit) {
        const expense = expenses.map(item => (item.id === id ? { ...item, charge, amount } : item));
        setExpenses(expense);
        setEdit(false);
        handleAlert({ type: 'success', text: `${charge} edited successfully !` });
      } else {
        setExpenses([...expenses, { id: uuid(), charge: charge, amount: amount }]);
        handleAlert({ type: 'success', text: 'Item added successfully !' });
      }
      setCharge('');
      setAmount('');

    } else {
      handleAlert({ type: 'danger', text: 'Charge/Amount invalid !' });
    }
  };

  const handleDelete = id => {
    const expense = expenses.filter(item => item.id !== id);
    setExpenses(expense);
    handleAlert({ type: 'danger', text: 'Item removed !' });
  };

  const handleEdit = id => {
    const expense = expenses.find(item => item.id === id);
    setCharge(expense.charge);
    setAmount(expense.amount);
    setEdit(true);
    setId(id);
  };

  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: 'danger', text: 'All items removed !' });
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">
          <span>
            <img src={logo} className="App-logo" alt="logo" />
         </span>
          React Budget Calculator
        </h1>
      </header>

      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert alert={alert} />
      <main>
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
        <div>
          <h2>Total Spending:{" "}
            <span className="total">
              $ {" "}
              {expenses.reduce((total, current) => {
                return (
                  total += parseInt(current.amount)
                );
              }, 0)}
            </span>
          </h2>

        </div>
      </main>

      <footer>&copy; 2021 Created By Marzieh ! <span>Inspired by Coding Addict</span></footer>

    </div>
  );
}

export default App;
