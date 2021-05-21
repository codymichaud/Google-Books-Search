import React from 'react';

export function Textarea(props) {
    return (
        <div className='formGroup'>
            <textarea className='form-control' rows='20' {...props} />
        </div>
    );
}