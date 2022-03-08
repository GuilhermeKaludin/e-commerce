import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

function FormInput({ name, label, required }) {
  const { control } = useForm();
  const isError = false;

  return (
    <Grid item xs={12} sm={6}>
     <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <TextField
                    fullWidth
                    label={label}
                    required
                />
            )}
        />
  
    </Grid>
  );
}

export default FormInput;