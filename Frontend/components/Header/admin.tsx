import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Select } from '@mui/material';

const AdminPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSubmit = (values, { setSubmitting }) => {
    // Aquí puedes enviar startDate y endDate al backend
    console.log('Fecha de inicio:', startDate);
    console.log('Fecha de fin:', endDate);

    // Después de enviar las fechas, puedes hacer cualquier otra lógica necesaria

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        startDate: "", 
        endDate: ""
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-1/2">
              <div className="mb-8">
                <label
                  htmlFor="startDate"
                  className="mb-3 block text-sm font-medium text-dark dark:text-white"
                >
                  Fecha de inicio:
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                // ... Otras propiedades
                />
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2">
              <div className="mb-8">
                <label
                  htmlFor="endDate"
                  className="mb-3 block text-sm font-medium text-dark dark:text-white"
                >
                  Fecha de fin:
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  dateFormat="dd/MM/yyyy"
                // ... Otras propiedades
                />
              </div>
            </div>
            <div className="w-full px-4">
              <button
                disabled={isSubmitting}
                type="submit"
                className="rounded-md bg-white py-4 px-9 text-base font-semibold text-primary transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
              >
                Reservar
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AdminPage;
