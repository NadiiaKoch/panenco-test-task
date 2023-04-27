import { Formik, Form, FormikHelpers, }  from 'formik';
import React from 'react';
import { object, string } from 'yup';
import { Button } from './Button';
import './AddTeamForm.css';
import { TextInput } from './TextInput';
import { FormSelect } from './FormSelect';

const initialValues = {
  name: '',
  city: '',
  abbreviation: '',
  conference: 'East',
}

const selectOptions = ['East', 'West'];

const handleSubmit = (values: typeof initialValues, formikHelpers: FormikHelpers<typeof initialValues>) => {
  const prevItems = JSON.parse(localStorage.getItem('formValues') || `[]`)
  localStorage.setItem('formValues', JSON.stringify([...prevItems, JSON.stringify(values)]));
  formikHelpers.resetForm();
};

const AddTeamForm = () => {
  return (
    <Formik 
      enableReinitialize={false}
      validationSchema={
        object({
          name: string().required().min(2).max(10),
          city: string().required().matches(/^[A-Z][a-z]*( [A-Z][a-z]*)*$/, 'should start with a capital letter and not contain digits'),
          abbreviation: string().required().matches(/^[A-Z]+$/, 'Only uppercase')
        })
      }
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ errors }) => (
        <Form className="form">
          <TextInput name="name" placeholder="Team name" labelText="Name" error={errors.name}/>
          <TextInput name="city" placeholder="Only letters" labelText="City" error={errors.city}/>
          <TextInput name="abbreviation" placeholder="Only uppercase" labelText="Abbreviation" error={errors.abbreviation}/>
          <FormSelect options={selectOptions} labelText="Conference"/>
          <Button classNameButton="form-button" text="Add team" />
        </Form>
      )} 
    </Formik>
  );
};

export default AddTeamForm;
