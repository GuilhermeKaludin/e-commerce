import React, {useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { commerce } from '../../lib/commerce';
import FormInput from './CustomTextField';

const AddressForm = ({checkoutToken, test}) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm();

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    };

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };

 
    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []);

    useEffect(() => {
        if (shippingCountry) fetchSubdivisions (shippingCountry);
    }, [shippingCountry]);

    

    return (
        <>
          <Typography variant="h6" gutterBottom>Endereço de entrega</Typography>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data) => test({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
              <Grid container spacing={3}>
                <FormInput required name="firstName" label="Nome" />
                <FormInput required name="lastName" label="Sobrenome" />
                <FormInput required name="address1" label="Endereço" />
                <FormInput required name="city" label="Bairro" />
                <FormInput required name="email" label="Email" />
                <FormInput required name="zip" label="CEP" />
                <Grid item xs={12} sm={6}>
                  <InputLabel>País</InputLabel>
                  <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                    {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel>Cidade</InputLabel>
                  <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                    {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                
              </Grid>
              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button component={Link} variant="outlined" to="/cart">Voltar ao carrinho</Button>
                <Button type="submit" variant="contained" color="primary">Próximo</Button>
              </div>
            </form>
          </FormProvider>
        </>
      );
    };
    
    export default AddressForm;