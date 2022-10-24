import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from  'react-datepicker';
import es from 'date-fns/locale/es';
registerLocale('es', es);
setDefaultLocale('es');


export const AddEmployeeComponent = () => {
    const [validated, setValidated] = useState(false);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [values, setValues] = useState({
        name: '',
        lastName: '',
        birthDate: new Date(),
    });
    
    const [validations, setValidations] = useState({
        name: '',
        lastName: '',
        birthDate: '',
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const validateAll = () => {
        if (date) {
            values.birthDate = date;
        }
        const { name, lastName, birthDate  } = values
        const validations = { name: '', lastName: '', birthDate: '' }
        let isValid = true
    
        if (!name) {
          validations.name = 'Nombre requerido';
          isValid = false;
        }
    
        if ((name && name.length < 2) || name.length > 30) {
          validations.name = 'El nombre debe contener entre 2 y 30 caracteres';
          isValid = false;
        }

        if (!lastName) {
            validations.lastName = 'Apellido requerido';
            isValid = false;
        }
    
        if ((lastName && lastName.length < 2) || lastName.length > 30) {
            validations.lastName = 'El apellido debe contener entre 2 y 30 caracteres';
            isValid = false;
        }

        if (!birthDate) {
            validations.birthDate = 'Selecciona la fecha de nacimiento';
            isValid = false;
        }
    
        if (!isValid) {
          setValidations(validations)
        }
    
        return isValid
    }

    const validateOne = (e:any) => {
        const { name } = e.target;
        const value = values[name];
        let message = '';

        if (!value) {
            const valueName = name === "name" ? "Nombre" : name === "lastName" ? "Apellido" : "Fecha de nacimiento";
            message = `${valueName} es requerido`;
        }

        if (value && name === 'name' && (value.length < 2 || value.length > 30)) {
            message = 'El nombre debe contener entre 2 y 30 caracteres'
        }

        if (value && name === 'lastName' && (value.length < 2 || value.length > 30)) {
            message = 'El nombre debe contener entre 2 y 30 caracteres'
        }

        setValidations({ ...validations, [name]: message })
    }

    const handleChange = (e:any) => {
        if (e && e.target) {
            const { name, value } = e.target;
            setValues({ ...values, [name]: value });
        }
        
    }
    
    const handleSubmit = (event:any) => {
        event.preventDefault();
        const isValid = validateAll();

        if (!isValid) {
            return false;
        }

        const dateEmployee = values.birthDate;
        let formatteDate = `${dateEmployee.getFullYear()}/${dateEmployee.getMonth() + 1}/${dateEmployee.getDate()}`
        
        const request = {
            name: values.name,
            last_name: values.lastName,
            birthday: formatteDate,
        };

        fetch('https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/valeria_meneses', {
            method: 'POST',
            body: JSON.stringify(request),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then((response) => {
            handleClose();
            document.getElementById('addEmployee').reset();
        });
    };

    const { name, lastName, birthDate } = values;

    const { name: nameVal, lastName: lastNameVal, birthDate: birthDateVal } = validations;

    return (
        <>
            <Button variant="outline-info" onClick={handleShow} >
                <ion-icon name="person-add" />
                <span className="ml-2 d-none d-md-inline">Agregar Empleado</span>
            </Button>

            <Modal show={show} onHide={handleClose} animation={false} >
                <Modal.Header closeButton>
                <Modal.Title>
                    <ion-icon name="person-add" />
                    <span className="ml-3">Agregar Empleado</span>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit} id="addEmployee" >
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Nombre(s)</label>
                            <input 
                                className={`form-control ${nameVal && "is-invalid"}`}
                                name="name"
                                onBlur={validateOne}
                                onChange={handleChange}
                                placeholder="Nombre(s)" 
                                required
                                type="text" 
                                value={name}
                            />
                            <div className="invalid-feedback">{nameVal}</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Apellido(s)</label>
                            <input 
                                className={`form-control ${lastNameVal && "is-invalid"}`}
                                name="lastName"
                                onBlur={validateOne}
                                onChange={handleChange}
                                placeholder="Apellido(s)"
                                required
                                type="text" 
                                value={lastName}
                            />
                            <div className="invalid-feedback">{lastNameVal}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Fecha de nacimiento</label>
                            <DatePicker
                                className="form-control"
                                customInput={
                                    <input 
                                        className={`form-control ${!date && "is-invalid"}`}
                                        name="birthDate"
                                        onBlur={validateOne}
                                        required
                                        type="text" 
                                    />
                                }
                                locale="es"
                                maxDate={new Date()}
                                onChange={(date:any) => setDate(date)}
                                selected={date}
                            />
                            
                            {!date && <div className="invalid-date">Campo requerido</div>}
                        </div>
                        <div className="modal-footer">
                            <Button variant="secondary" onClick={handleClose}>
                                Cancelar
                            </Button>
                            <Button type="submit" variant="info" >
                                Guardar
                            </Button>
                        </div>
                    </Form>

                </Modal.Body>
        </Modal>
        </>
    );
}
