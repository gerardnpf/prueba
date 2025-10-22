import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listTransactions } from '../actions/transactionActions';
import { Pie } from 'react-chartjs-2';

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const transactionList = useSelector((state) => state.transactionList);
  const { loading, error, transactions } = transactionList;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(listTransactions());
    }
  }, [dispatch, history, userInfo]);

  const expenses = transactions
    ? transactions.filter((t) => t.type === 'expense')
    : [];
  const income = transactions
    ? transactions.filter((t) => t.type === 'income')
    : [];

  const totalExpenses = expenses.reduce((acc, item) => acc + item.amount, 0);
  const totalIncome = income.reduce((acc, item) => acc + item.amount, 0);
  const balance = totalIncome - totalExpenses;

  const data = {
    labels: [...new Set(expenses.map((e) => e.category.name))],
    datasets: [
      {
        data: expenses.map((e) => e.amount),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
      },
    ],
  };

  return (
    <>
      <h1>Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h2>Balance: ${balance.toFixed(2)}</h2>
          <h3>Total Income: ${totalIncome.toFixed(2)}</h3>
          <h3>Total Expenses: ${totalExpenses.toFixed(2)}</h3>
          <div>
            <h3>Expenses by Category</h3>
            <Pie data={data} />
          </div>
          <Link to="/add">Add Transaction</Link>
          <Link to="/history">View History</Link>
          <Link to="/categories">Manage Categories</Link>
        </div>
      )}
    </>
  );
};

export default HomeScreen;
