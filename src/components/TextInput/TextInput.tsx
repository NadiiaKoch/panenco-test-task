import { ErrorMessage, Field } from 'formik';
import React from 'react';
import cn from 'classnames';
import './TextInput.css';


type Props = {
  name: string,
  placeholder: string,
  labelText: string,
  error: string | undefined,
};

export const TextInput: React.FC<Props> = React.memo(({
  name,
  placeholder,
  labelText,
  error,
}) => {
  return (
  <div className="textInput">
    <label className="label" htmlFor={name}>
      {labelText}
    </label>
      <Field 
        id={name}
        name={name} 
        placeholder={placeholder}
        className={cn(
        'field',
        {'error': error})} 
      />
      <ErrorMessage name={name} component="div" className="error-message"/>
  </div>
  )
});