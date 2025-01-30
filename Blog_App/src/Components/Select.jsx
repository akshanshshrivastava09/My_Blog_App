import {React ,useId} from 'react'


function Select({
    options,
    label,
    className = "",
    ...props
},ref) {
    id =useId()
  return (
    <div className="w-full">
        {label&& <label htmlFor={id} className=""></label>}
        <select 
        {...props}
        id={id}
        ref = {ref}
        className={`px-3 py-2 rounded-lg bg-white text-black  outline-none focus:bg-grey-50 duration-500 border border-200-grey w-full ${className}`}
        >
           /*we will loop in options but we will check that options are existing or not otherwise our project will crash  */
           /*options by default give array  */
           {options?.map(option=>{
            <option key={option} value={option}>{option}</option>
           })}
        </select>
    </div>
  )
}

export default Select;