import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addData, updateData } from '../../redux/reducers/financeReducer'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

const AddFinance = () => {
  const { id } = useParams();
  const [item, setItem] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('Expense')
  const [findata, setfindata] = useState([])
  const [errorMsg, seterrorMsg] = useState('')
  const [MsgType, setMsgType] = useState('blue')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.finance);
  useEffect(() => {
    if (id) {
      const findata = data.find(itemx => itemx.id == parseInt(id));
      if (findata) {
        setItem(findata.name);
        setAmount(findata.amount);
        setType(findata.type);
      }
    }
  }, [id, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      const amountNumber = parseFloat(amount);
      dispatch(updateData({ id: id, name: item, amount: amountNumber, type: type }))
      seterrorMsg('Finance Updated Successfully!');
    } else {
      const amountNumber = parseFloat(amount);
      dispatch(addData({ id: Date.now(), name: item, amount: amountNumber, type: type }))
      seterrorMsg('Finance Added Successfully!');
      setMsgType('green')
    }
    setTimeout(() => {
      navigate('/dashboard')
    }, 1000)
  }


  return (
    <>
      {(errorMsg ?
        <div class={`relative top-0 left-0 right-0 bg-${MsgType}-500 text-white text-center py-3 px-4 shadow-lg z-50 `}>
          <span class="font-bold"></span> {errorMsg}
          <button class="absolute top-2 right-2 text-white" onclick="this.parentElement.style.display='none';">
            &times;
          </button>
        </div>
        : null)}
      <div className='flex items-center w-full h-screen justify-evenly dark:bg-gray-900 dark:text-white '>
        <form className="py-2 w-full h-full md:w-2/4 lg:w-1/4 md:h-max md:rounded-2xl dark:md:shadow-none dark:md:border md:shadow-2xl flex flex-col items-center justify-center dark:text-white dark:bg-gray-900 dark:shadow-gray-500" onSubmit={handleSubmit} >
          <h2 className='text-xl lg:text-2xl lg:font-semibold italic'>{id ? "Edit": 'Add'} Finance Data</h2>
          <div className='w-4/5 my-2'>
            <small className='block text-left'>Item Name</small>
            <input className="w-full p-4 border rounded text-center focus:text-left" placeholder='Item Name' type="text" name='username' value={item} onChange={(e) => { setItem(e.target.value) }} required />
          </div>
          <div className="w-4/5 my-1">
            <small className='block text-left'>Finance Type</small>
            <select className='border rounded p-2 w-full text-center text-gray-900' name="type" value={type} onChange={(e) => { setType(e.target.value) }} required>
              <option value="Expense">Expense</option>
              <option value="Income" >Income</option>
            </select>
          </div>
          <div className="w-4/5 my-1 mb-3">
            <small className='block text-left'>Item Name</small>
            <input className="w-full p-4 border rounded text-center focus:text-left" placeholder='Amount' type="number" name='username' value={amount} onChange={(e) => { setAmount(e.target.value) }} required />
          </div>
          <button className="my-2 text-center px-4 py-2 w-3/5 cursor-pointer bg-green-500 text-white rounded hover:bg-green-700 hover:w-4/5">{id ? "Update": 'Add'} Finance Data</button>
          <Link to='/dashboard'>&larr; Go Back</Link>
        </form>
      </div>
    </>
  )
}

export default AddFinance