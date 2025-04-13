
import React, { useState } from 'react'
import { Input } from './Input';
import { Select } from './Select';

export default function ExpenseForm({setExpenses,expense,setExpense,editingRowId,setEditingRowId }) {
    
    
    const [errors,setErrors]=useState({})
    const validateConfig= {
        title:[{required:true, message:'Please select a title'},
            {minlength:3 ,message:'Title should be of minimimum 3 characters'}
        ],
        category:[{required:true, message:'Please select a Category'}],
        amount:[{required:true, message:'Please select Amount'},{pattern: /^\d+(\.\d{1,2})?$/, message:'Please enter a valid Amount'}],
    }
    const validate =(formData)=>{
        const errorsData={}
       Object.entries(formData).forEach(([key,value])=>{
        validateConfig[key].forEach((rule)=>{
        
            if(rule.required && !value)
            {
                errorsData[key]=rule.message
            }
            if(rule.minlength && value.length<3)
                {
                    errorsData[key]=rule.message
                }
            if (rule.pattern && !rule.pattern.test(String(value))) {
                errorsData[key] = rule.message;
              }
        })
       })
          return errorsData 
    }
    const handleSubmit = (e) => {
        e.preventDefault();     //will not refresh the page
      
        const validationErrors = validate(expense);
        console.log(validationErrors); //  get errors if any from current expense object 
        setErrors(validationErrors);                //  update state
      
        if (Object.keys(validationErrors).length > 0) return; //  stop if errors
      
        if(editingRowId)
        {
          setExpenses((prevState)=>
            prevState.map((exp)=>{
              if(exp.id === editingRowId){
                
                return {...expense,id:editingRowId}
              }
              return exp
            })
          )
          setExpense({
            title: '',
            category: '',
            amount: ''
          });
          setEditingRowId('')
          return
        }

        //  Only run this if no validation errors
        setExpenses((prevState) => [
          ...prevState,
          { ...expense, id: crypto.randomUUID() }
        ]);
      
        // Reset form
        setExpense({
          title: '',
          category: '',
          amount: ''
        });
      };

  const handleChange=(e)=>{
    const{name,value}=e.target
    setExpense((prevState)=>({...prevState,
        [name]:value}))
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <Input label='Title' name='title' value={expense.title} onChange={handleChange} error={errors.title}/>

      <Select label='Category' name='category' value={expense.category} onChange={handleChange} error={errors.category} options={['Grocery','Clothes','Bills','Education','Medicine']}/>
      <Input label='amount' name='amount' value={expense.amount} onChange={handleChange} error={errors.amount} />

      <button className="add-btn">{editingRowId? 'Save':'Add'}</button>
    </form>
  )
}
