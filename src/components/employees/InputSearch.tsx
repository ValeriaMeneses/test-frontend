import { useState } from 'react';
import PropTypes from 'prop-types';

export const InputSearch = ({ onChangeInput }) => {

    const [ inputValue, setInputValue ] = useState('');

    const onIputChange = ({ target }) => {
        setInputValue(target.value);

        if (inputValue.trim().length <= 0) return;

        onChangeInput(inputValue.trim());
    }


    const onSubmit = (event: any) => {
        event.preventDefault();

        if (inputValue.trim().length <= 1) return;

        onChangeInput(inputValue.trim());
    }
    
    return (
        <div className="InputSearch-container">
            <div 
                className="input-group mb-3" 
                onSubmit={ onSubmit } 
            >
                <input
                    className="form-control" 
                    name="search"
                    onChange={ onIputChange }
                    placeholder="Introduce el nombre del empleado"
                    type='text'
                    value={ inputValue }
                />
                <div className="input-group-append">
                    <button className="btn btn-outline-info" type="button">
                        <svg id="i-search" className="mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1rem" height="1rem" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
                            <circle cx="14" cy="14" r="12" />
                            <path d="M23 23 L30 30"  />
                        </svg>
                        <span className="d-none d-md-inline">Buscar</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

/* InputSearch.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
} */