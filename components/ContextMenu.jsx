import React from 'react'

export default function ContextMenu({menuPosition,setMenuPosition,setExpenses,rowId,setExpense,expenses,setEditingRowId}) {

  // console.log(expenses);

  if(!menuPosition.left) return
  return (
    <div className="context-menu" style={menuPosition}>
      <div onClick={()=>{
        console.log('edit');
        setMenuPosition({})
        // console.log(rowId);
       const {title,category,amount}= expenses.find((exp)=> exp.id===rowId )
            setExpense({title,category,amount});
            setEditingRowId(rowId)
       
      }}>Edit</div>
      <div onClick={()=>{
        console.log('delete');
        setMenuPosition({})
        setExpenses((prevState)=>
          prevState.filter((expense)=> expense.id !==rowId))
      }}>Delete</div>
    </div>
  )
}