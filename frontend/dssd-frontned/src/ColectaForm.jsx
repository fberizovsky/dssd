// src/components/ColectaForm.jsx
import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { items } from '../src/data/Items';
import axios from 'axios';

const ColectaForm = () => {

    const defaultValues = {
        items: [{ nombre: '', cantidad: '' }] // Inicializa con un item vacío
    };

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    const { fields, append, remove } = useFieldArray({ control, name: 'items' });

    const onSubmit = (data) => {
        console.log(data);
        axios.post('http://localhost:8080/api/colectas', data)
            .then((response) => {
                console.log(response);
                reset(defaultValues);
            });
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-4 p-fluid">
            <h4 className="text-center mb-4">Formulario de Colecta</h4>
            {fields.map((item, index) => (
                <div key={item.id} className="card mb-3 p-3 shadow-sm">
                    <div className="row g-3">
                        <div className="col-md-6">
                            {/* <label htmlFor={`items[${index}].nombre`} className="form-label">Nombre del Item</label> */}
                            <Controller
                                name={`items[${index}].nombre`}
                                control={control}
                                rules={{ required: 'Nombre del item es requerido' }}
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
                            <label htmlFor={`items[${index}].cantidad`} className="form-label">Cantidad del Item</label>
                            <Controller
                                name={`items[${index}].cantidad`}
                                control={control}
                                rules={{ required: 'Cantidad del item es requerida' }}
                                render={({ field }) => (
                                    <InputText
                                        id={`items[${index}].cantidad`}
                                        {...field}
                                        keyfilter="int"
                                        className={`form-control ${errors.items && errors.items[index] && errors.items[index].cantidad ? 'is-invalid' : ''}`}
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
                    onClick={() => append({ nombre: '', cantidad: '' })}
                    className="p-button-success"
                />
            </div>

            <div className="text-center">
                <Button type="submit" label="Agregar colecta" className="p-button-primary" />
            </div>
        </form>
    );
};

export default ColectaForm;
