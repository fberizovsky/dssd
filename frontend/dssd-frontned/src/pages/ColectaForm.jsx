import React, { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { items } from '../data/Items';
import axios from 'axios';

const ColectaForm = () => {
    const [depositos, setDepositos] = useState([]);

    const defaultValues = {
        recolector: '',
        dni: '',
        deposito: null,
        items: [{ nombre: '', cantidad: '' }]
    };

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    const { fields, append, remove } = useFieldArray({ control, name: 'items' });

    // Obtener lista de depósitos desde la API
    useEffect(() => {
        axios.get('http://localhost:8080/api/comunalDeposit')
            .then((response) => {
                setDepositos(response.data); // Suponiendo que devuelve un array de depósitos
            })
            .catch((error) => {
                console.error('Error al cargar los depósitos:', error);
            });
    }, []);

    const onSubmit = (data) => {
        // Asegúrate de que 'data.deposito' tenga el valor correcto
        const formData = {
            nombreRecolector: data.recolector, // Nombre del recolector
            dniRecolector: data.dni, // DNI del recolector
            idDepositoComunal: data.deposito, // Aquí directamente tomamos el id del deposito seleccionado
            items: data.items.map(item => ({
                nombre: item.nombre,  // Nombre del item
                cantidad: item.cantidad // Cantidad del item
            }))
        };
        
        console.log("Datos enviados:", formData); // Verifica los datos antes de enviarlos
        
        // Envía los datos al backend
        axios.post('http://localhost:8080/api/colecta', formData)
            .then((response) => {
                console.log('Datos enviados correctamente', response);
                reset(defaultValues); // Resetea el formulario con los valores predeterminados
            })
            .catch((error) => {
                console.error('Error al enviar los datos:', error);
            });
    };
    
    

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>;
    };

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container mt-4 p-fluid">
        <h4 className="text-center mb-4">Formulario de Colecta</h4>

        {/* Nombre del recolector */}
        <div className="mb-3">
          <label htmlFor="recolector" className="form-label">
            Nombre del Recolector
          </label>
          <Controller
            name="recolector"
            control={control}
            rules={{ required: "El nombre del recolector es obligatorio" }}
            render={({ field }) => (
              <InputText
                id="recolector"
                {...field}
                className={`form-control ${
                  errors.recolector ? "is-invalid" : ""
                }`}
              />
            )}
          />
          {getFormErrorMessage("recolector")}
        </div>

        {/* DNI del recolector */}
        <div className="mb-3">
          <label htmlFor="dni" className="form-label">
            DNI del Recolector
          </label>
          <Controller
            name="dni"
            control={control}
            rules={{
              required: "El DNI es obligatorio",
              pattern: {
                value: /^\d+$/,
                message: "El DNI debe contener solo números",
              },
            }}
            render={({ field }) => (
              <InputText
                id="dni"
                {...field}
                className={`form-control ${errors.dni ? "is-invalid" : ""}`}
              />
            )}
          />
          {getFormErrorMessage("dni")}
        </div>

        {/* Depósito */}
        <div className="mb-3">
          <label htmlFor="deposito" className="form-label">
            Depósito
          </label>
          <Controller
            name="deposito"
            control={control}
            rules={{ required: "El depósito es obligatorio" }}
            render={({ field }) => (
              <select
                id="deposito"
                {...field}
                className={`form-select ${
                  errors.deposito ? "is-invalid" : ""
                }`}>
                <option value="">Seleccione un depósito</option>
                {depositos.map((deposito) => (
                  <option key={deposito.id} value={deposito.id}>
                    {deposito.name}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.deposito && (
            <div className="invalid-feedback">{errors.deposito.message}</div>
          )}
        </div>

        {/* Items */}
        {fields.map((item, index) => (
          <div key={item.id} className="card mb-3 p-3 shadow-sm">
            <div className="row g-3">
              <div className="col-md-6">
                <Controller
                  name={`items[${index}].nombre`}
                  control={control}
                  rules={{ required: "Nombre del item es requerido" }}
                  render={({ field }) => (
                    <Dropdown
                      id={`items[${index}].nombre`}
                      {...field}
                      options={items}
                      className="form-select"
                    />
                  )}
                />
                {getFormErrorMessage(`items[${index}].nombre`)}
              </div>
              <div className="col-md-4">
                <label
                  htmlFor={`items[${index}].cantidad`}
                  className="form-label">
                  Cantidad del Item
                </label>
                <Controller
                  name={`items[${index}].cantidad`}
                  control={control}
                  rules={{ required: "Cantidad del item es requerida" }}
                  render={({ field }) => (
                    <InputText
                      id={`items[${index}].cantidad`}
                      {...field}
                      keyfilter="int"
                      className={`form-control ${
                        errors.items &&
                        errors.items[index] &&
                        errors.items[index].cantidad
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                  )}
                />
                {getFormErrorMessage(`items[${index}].cantidad`)}
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <Button
                  type="button"
                  label="Eliminar Item"
                  onClick={() => remove(index)}
                  className="p-button-danger w-100"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="d-flex justify-content-end mb-3">
          <Button
            type="button"
            label="Agregar Item"
            onClick={() => append({ nombre: "", cantidad: "" })}
            className="p-button-success"
          />
        </div>

        <div className="text-center">
          <Button
            type="submit"
            label="Agregar colecta"
            className="p-button-primary"
          />
        </div>
      </form>
    );
};

export default ColectaForm;
