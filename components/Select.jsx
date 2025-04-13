import React from 'react'

export const Select = ({ label, id, name, value, onChange,options, error }) => {
  return (
    <div className='input-container'>
        <label htmlFor={id}> {label}</label>
        <select name={name} id={id} value={value} onChange={onChange}>
        <option value="" hidden>Select category</option>
            {            
            options.map((option,i)=>{
               return <option value={option} key={i}>{option}</option>
            })
            }    
        </select>
        <p className='error'> {error}</p>
        
              
            
    </div>
  )
}
