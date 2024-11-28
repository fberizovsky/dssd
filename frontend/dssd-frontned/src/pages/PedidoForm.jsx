import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import { items } from '../data/Items';
import config from '../config/config';

const PedidoForm = () => {
  const { control, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: {
      items: [{ nombre: '', cantidad: 0 }]
    }
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>;
  };

  const onSubmit = (data) => {
    const formData = {
      items: data.items.map(item => ({
        nombre: item.nombre,
        cantidad: item.cantidad
      }))
    };

    console.log("Datos enviados:", formData);

    const token = localStorage.getItem('token'); // O donde hayas almacenado la token

    axios.post(
    `${config.BASE_URL}/api/orden`,
    formData,
    {
        headers: {
        Authorization: `Bearer ${token}`
        }
    }
    )
    .then((response) => {
    console.log('Datos enviados correctamente', response);
    reset();
    })
    .catch((error) => {
    console.error('Error al enviar los datos:', error);
    });

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mt-4 p-fluid">
      <h4 className="text-center mb-4">Formulario de Orden</h4>

      {fields.map((item, index) => (
        <div key={item.id} className="card mb-3 p-3 shadow-sm">
          <div className="row g-3">
            <div className="col-md-5">
              <label htmlFor={`items[${index}].nombre`} className="form-label">Nombre del Item</label>
              <Controller
                name={`items[${index}].nombre`}
                control={control}
                rules={{ required: "El nombre del item es obligatorio" }}
                render={({ field }) => (
                  <Dropdown
                    id={`items[${index}].nombre`}
                    {...field}
                    options={items.map(item => ({ label: item, value: item }))}
                    placeholder="Seleccione un item"
                    className={`form-control ${errors.items?.[index]?.nombre ? "is-invalid" : ""}`}
                  />
                )}
              />
              {getFormErrorMessage(`items[${index}].nombre`)}
            </div>

            <div className="col-md-5">
              <label htmlFor={`items[${index}].cantidad`} className="form-label">Cantidad</label>
              <Controller
                name={`items[${index}].cantidad`}
                control={control}
                rules={{
                  required: "La cantidad es obligatoria",
                  min: { value: 1, message: "La cantidad debe ser mayor a 0" }
                }}
                render={({ field }) => (
                  <InputText
                    id={`items[${index}].cantidad`}
                    {...field}
                    type="number"
                    className={`form-control ${errors.items?.[index]?.cantidad ? "is-invalid" : ""}`}
                  />
                )}
              />
              {getFormErrorMessage(`items[${index}].cantidad`)}
            </div>

            <div className="col-md-2 d-flex align-items-end">
              <Button type="button" label="Eliminar Item" onClick={() => remove(index)} className="p-button-danger w-100" />
            </div>
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-end mb-3">
        <Button type="button" label="Agregar Item" onClick={() => append({ nombre: '', cantidad: 0 })} className="p-button-success" />
      </div>

      <div className="text-center">
        <Button type="submit" label="Crear Orden" className="p-button-primary" />
      </div>
    </form>
  );
};

export default PedidoForm;
