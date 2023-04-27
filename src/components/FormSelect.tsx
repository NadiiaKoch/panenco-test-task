import { Field } from "formik";
import React from "react";
import "./FormSelect.css";


type Props = {
  options: string[] | number[],
  labelText: string,
};

export const FormSelect: React.FC<Props> = React.memo(({
  options,
  labelText
}) => {
  return (
    <div className="select-wrapper">
      <label className="select-label" htmlFor="select">{labelText}</label>
      <Field id="select" name="conference" as="select" className="select" >
        {options.map(option => (
          <option value={option}>{option}</option>
        ))}
      </Field>
    </div>
  )
});