import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

const ExpenseItem = ({expense, handleEdit, handleDelete}) => {
  const {id, charge, amount} = expense;

  return (
    <li className="item">
      <div className="info">
        <span className="expense">{charge}</span>
        <span className="amount">${amount}</span>
      </div>
      <div>
        <button
          className="edit-btn btn-icon"
          aria-label="Edit"
          onClick={() => handleEdit(id)} >
          <MdEdit />
        </button>
        <button
          className="clear-btn btn-icon"
          aria-label="Delete"
          onClick={() => handleDelete(id)} >
          <MdDelete />
        </button>
      </div>
    </li>


  )
}

export default ExpenseItem
