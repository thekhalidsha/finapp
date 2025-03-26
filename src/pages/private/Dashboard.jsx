import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { delData } from '../../redux/reducers/financeReducer';
import Chart from 'react-google-charts';
import LocalStorageActions from '../../components/LocalStorageActions';

const Dashboard = () => {
  const data = useSelector((state) => { return state.finance });
  const dispatch = useDispatch();
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const piedata = [
    ["Task", "Amount"],
    ["Income", totalIncome],
    ["Expense", totalExpense],
  ];
  useEffect(() => {
    const expenseTotal = data
      .filter(item => item.type === 'Expense')
      .map(item => item.amount)
      .reduce((acc, curr) => acc + curr, 0);

    const incomeTotal = data
      .filter(item => item.type === 'Income')
      .map(item => item.amount)
      .reduce((acc, curr) => acc + curr, 0);

    setTotalExpense(expenseTotal);
    setTotalIncome(incomeTotal);
  }, [data]);
  var options = {
    is3D: true,
    height: 600,
    backgroundColor: {
      fillOpacity: 0
    },
    legend: {
      position: 'top',
      textStyle: {
        color: '#00FF33',
      },
    },
  }
  return (
    <div className="p-7 dark:bg-gray-900 dark:text-gray-100">
      <LocalStorageActions />
      <div className="relative overflow-x-auto ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-100">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-100">
            <tr>
              <th className='px-6 py-3 border text-center bg-gray-200 dark:bg-gray-700' colSpan={3}>Finance Data</th>
              <th className='px-6 py-3 border text-center bg-gray-200 dark:bg-gray-700'>
                <Link to='addFinance' className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700'>Add Fin Data</Link>
              </th>
            </tr>
            <tr>
              <th scope="col" className="px-6 py-3 border-x">
                Name
              </th>
              <th scope="col" className="px-6 py-3 border-x">
                Type
              </th>
              <th scope="col" className="px-6 py-3 border-x">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 border-x">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {(data.length > 0 ? data.map((item, key) => {
              return (
                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200  ">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border dark:text-gray-100">
                    {item.name}
                  </th>
                  <td className="px-6 py-4 border text-black dark:text-gray-100">
                    {item.type.toUpperCase()}
                  </td>
                  <td className="px-6 py-4 border text-black dark:text-gray-100">
                    <i className="fa-classic fa-solid fa-indian-rupee-sign"></i> {item.amount}
                  </td>
                  <td className="px-6 py-4 border w-1/5">
                    <div className="flex justify-around">
                      <Link to={`addFinance/${item.id}`} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>Edit</Link>
                      <button className='px-4 py-2 bg-red-500 cursor-pointer text-white rounded hover:bg-red-700' onClick={() => { confirm('Are you sure to delete ' + item.name + '?') ? dispatch(delData(item.id)) : null }}>Delete</button>
                    </div>
                  </td>
                </tr>
              )
            })
              :
              <tr>
                <th className='border text-center p-4' colSpan={4}>No Results Found!</th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Chart
        className="flex items-center justify-center p-4 dark:bg-gray-900"
        chartType="PieChart"
        data={piedata}
        options={options}
        width={"100%"}
      />

    </div>
  )
}

export default Dashboard