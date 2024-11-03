import React, { useState } from 'react';
import ExpenseItem from './ExpenseItem';
import ExpenseFilter from './ExpenseFilter/ExpenseFilter';
import Card from './Card';
import NewExpense from './NewExpense/NewExpense';
import './Expenses.css';
import Chart from './Chart/Chart';

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState('2021');
  const [isAddingExpense, setIsAddingExpense] = useState(false); 

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const startAddExpenseHandler = () => {
    setIsAddingExpense(true); 
  };

  const stopAddExpenseHandler = () => {
    setIsAddingExpense(false);
  };

  const addExpenseHandler = (expense) => {
    props.onAddExpense(expense);
    setIsAddingExpense(false);
  };

  const filteredExpenses = props.items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  const chartDataPoints = [
    { label: 'Jan', value: 0 },
    { label: 'Feb', value: 0 },
    { label: 'Mar', value: 0 },
    { label: 'Apr', value: 0 },
    { label: 'May', value: 0 },
    { label: 'Jun', value: 0 },
    { label: 'Jul', value: 0 },
    { label: 'Aug', value: 0 },
    { label: 'Sep', value: 0 },
    { label: 'Oct', value: 0 },
    { label: 'Nov', value: 0 },
    { label: 'Dec', value: 0 },
  ];

  for (const expense of filteredExpenses) {
    const expenseMonth = expense.date.getMonth();
    chartDataPoints[expenseMonth].value += expense.amount;
  }

  return (
    <div>
      <Card className="expenses">
        <div className="add-expense-container">
          <button
            className="add-expense-button"
            onClick={startAddExpenseHandler}
          >
            Add New Expense
          </button>
        </div>
  
        {isAddingExpense && (
          <NewExpense
            onAddExpense={addExpenseHandler}
            onCancel={stopAddExpenseHandler}
          />
        )}
  
        <ExpenseFilter selected={filteredYear} onChangeFilter={filterChangeHandler} />
        <Chart dataPoints={chartDataPoints} />
        
        {filteredExpenses.length === 0 ? (
          <p>No expenses found.</p>
        ) : (
          filteredExpenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              title={expense.title}
              amount={expense.amount}
              date={expense.date}
            />
          ))
        )}
      </Card>
    </div>
  );
};

export default Expenses;
