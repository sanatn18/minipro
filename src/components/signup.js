import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';

const Signup = () => {
    const paperStyle = { padding: 20, height:'85vh', width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    const initialValues={
        name:'',
        email:'',
        gender:'',
        phoneNumber:'',
        password:'',
        confirmPassword:'',
        termsAndConditions:false
    }

    const onSubmit=(values, props)=>{
        console.log(values)
        console.log(props)
        setTimeout(()=>{
            props.resetForm()
            props.setSubmitting(false)
        },2000)

    }
    
    const validationSchema=Yup.object().shape({
        name:Yup.string().min(2,"Invalid Name").required("Required"),
        email:Yup.string().email("Invalid Email").required("Required"),
        gender:Yup.string().oneOf(["male","female"],"Required"),
        phoneNumber:Yup.number().typeError("Invalid Phone Number").required("Required"),
        password:Yup.string().min(8,"Minimum Length: 8").required("Required"),
        confirmPassword:Yup.string().oneOf([Yup.ref('password')],"Passwords Mismatched").required("Required"),
        termsAndConditions:Yup.string().oneOf(["true"],"Accept Terms & Conditions")

    })

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account </Typography>
                </Grid>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(props)=>(
                        <Form>
                            
                    <Field as={TextField} fullWidth label='Name' name="name" placeholder="Enter your name"
                     style={marginTop} helperText={<ErrorMessage name="name"/>} />
                    <Field as={TextField} fullWidth label='Email' name="email" placeholder="Enter your email"
                     style={marginTop} helperText={<ErrorMessage name="email"/>} />
                    <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <Field as={RadioGroup} aria-label="gender" name="gender" style={{ display: 'initial' }}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </Field>
                    </FormControl>
                    <Field as={TextField} fullWidth label='Phone Number' name="phoneNumber" placeholder="Enter your phone number"
                     style={marginTop} helperText={<ErrorMessage name="phoneNumber"/>} />
                    <Field as={TextField} fullWidth label='Password' name="password" type="password" placeholder="Enter your password"
                     style={marginTop} helperText={<ErrorMessage name="password"/>}/>
                    <Field as={TextField} fullWidth label='Confirm Password' name="confirmPassword" type="password" placeholder="Confirm your password"
                     style={marginTop} helperText={<ErrorMessage name="confirmPassword"/>}/>
                    <FormControlLabel
                        control={<Field as={Checkbox} name="termsAndConditions" />}
                        label="I accept the terms and conditions."
                        style={marginTop}
                    />
                    <Button type='submit' variant='contained' disabled={props.isSubmitting} color='primary' style={marginTop}>{props.isSubmitting?"Loading":"Sign Up"}</Button>
                
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    )
}

export default Signup;