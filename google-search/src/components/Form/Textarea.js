import React from 'react';

export function TextArea(props) {
    return (
        <div className='formGroup'>
            <textarea className='form-control' rows='20' {...props} />
        </div>
    );
}