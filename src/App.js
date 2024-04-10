import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

// ExpenseForm component for adding new expenses
const ExpenseForm = ({ onAddExpense }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    const expense = {
      id: Math.random().toString(),
      title,
      amount: +amount,
    };
    onAddExpense(expense);
    setTitle("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Amount</label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button type="submit">Add Expense</button>
    </form>
  );
};

// ExpenseItem component for displaying individual expenses
const ExpenseItem = ({ expense, onDeleteExpense }) => {
  const { id, title, amount } = expense;

  const handleDelete = () => {
    onDeleteExpense(id);
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>${amount}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

// App component
const App = () => {
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  return (
    <>
    <Header/>
      <div>
        <h1>Expense Tracker</h1>
        <ExpenseForm onAddExpense={handleAddExpense} />
        <div>
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onDeleteExpense={handleDeleteExpense}
            />
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default App;
