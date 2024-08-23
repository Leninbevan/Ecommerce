import './buyModal.scss'
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setModalOpen } from '../../services/slice';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { IconButton } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OrderConfirm from '../../assests/orderConfirm.png'

import { useFormik } from 'formik';
import * as yup from 'yup';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '25px'
};

const validationSchema1 = yup.object({
    name: yup
        .string('Enter your Name')
        .required('Name is required'),
    mobileNumber: yup
        .string('Enter your Mobile Number')
        .required('Mobile Number is required'),
    email: yup
        .string('Enter your Email')
        .required('Email is required'),
    country: yup
        .string('Enter your Country')
        .required('Country is required'),
    state: yup
        .string('Enter your State')
        .required('State is required'),
    city: yup
        .string('Enter your City')
        .required('City is required'),
    zip: yup
        .string('Enter your Zip Code')
        .required('Zip Code is required'),
    address: yup
        .string('Enter your Address')
        .required('Address is required'),
});

const validationSchema2 = yup.object({
    paymentMethod: yup
        .string('Enter your Payment Method')
        .required('Payment Method is required'),
});

export default function BuyModal() {
    const open = useSelector(state => state.product.modalOpen)
    // const [open, setOpen]=React.useState(true)
    const dispatch = useDispatch()
    const sateCodeList = []
    const [buyStep, setBuyStep] = React.useState(1)
    const [dateList, setDateList] = React.useState([])

    const formik = useFormik({
        initialValues: {
            name: '',
            mobileNumber: '',
            email: '',
            country: '',
            state: '',
            city: '',
            zip: '',
            address: '',
            date: [],
            note: '',
            paymentMethod: '',
        },
        validationSchema: buyStep === 1 ? validationSchema1 : buyStep === 3 && validationSchema2,
        onSubmit: (values) => {
            console.log(values);
            setBuyStep(state => state + 1)
        },
    });

    function removeDate(index) {
        dateList.splice(index, 1)
        formik.values.date.splice(index, 1)
        setDateList([...dateList])
    }

    function addDate(date) {
        if (dateList.length === 3) {
            dateList.shift();
        }
        dateList.push(date)
        setDateList([...dateList])

        if (formik.values.date.length === 3) {
            formik.values.date.shift();
        }
        if (date) {
            formik.values.date.push(date)
        }
    }

    function removeAllValues(){

    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                // onClose={() => { dispatch(setModalOpen(false)) }}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Box sx={{ textAlign: 'right' }} onClick={() => { dispatch(setModalOpen(false)); setBuyStep(1); formik.resetForm() }}>
                            <Button sx={{ fontWeight: 'bold' }}>{buyStep !== 4 ? 'Cancel' : 'Close'}</Button>
                        </Box>
                        <form onSubmit={formik.handleSubmit}>
                            {
                                buyStep === 1 &&
                                <>
                                    <h3>Delivery Information</h3>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ width: '50%', p: '15px 10px' }}>
                                            <p>Name</p>
                                            <TextField id="outlined-basic"
                                                name='name'
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                error={formik.touched.name && Boolean(formik.errors.name)}
                                                helperText={formik.touched.name && formik.errors.name}
                                                variant="outlined" placeholder='Enter your name' size='small' sx={{ width: '100%' }} />
                                        </Box>
                                        <Box sx={{ width: '50%', p: '15px 10px' }}>
                                            <p>Mobile Number</p>
                                            <TextField id="outlined-basic"
                                                name='mobileNumber'
                                                value={formik.values.mobileNumber}
                                                onChange={formik.handleChange}
                                                error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                                                helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                                                variant="outlined" placeholder='Enter your mobile number' size='small' sx={{ width: '100%' }} />
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ width: '50%', p: '15px 10px' }}>
                                            <p>Email</p>
                                            <TextField id="outlined-basic"
                                                name='email'
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                error={formik.touched.email && Boolean(formik.errors.email)}
                                                helperText={formik.touched.email && formik.errors.email}
                                                variant="outlined" placeholder='Enter your email' size='small' sx={{ width: '100%' }} />
                                        </Box>
                                        <Box sx={{ width: '50%', p: '15px 10px' }}>
                                            <p>Country</p>
                                            <TextField id="outlined-basic"
                                                name='country'
                                                value={formik.values.country}
                                                onChange={formik.handleChange}
                                                error={formik.touched.country && Boolean(formik.errors.country)}
                                                helperText={formik.touched.country && formik.errors.country}
                                                variant="outlined" placeholder='Enter your country' size='small' sx={{ width: '100%' }} />
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ width: '50%', p: '15px 10px' }}>
                                            <p>State</p>
                                            <TextField id="outlined-basic"
                                                name='state'
                                                value={formik.values.state}
                                                onChange={formik.handleChange}
                                                error={formik.touched.state && Boolean(formik.errors.state)}
                                                helperText={formik.touched.state && formik.errors.state}
                                                variant="outlined" placeholder='Enter your state' size='small' sx={{ width: '100%' }} />
                                        </Box>
                                        <Box sx={{ display: 'flex', width: '50%' }}>
                                            <Box sx={{ width: '50%', p: '15px 10px' }}>
                                                <p>City</p>
                                                <TextField id="outlined-basic"
                                                    name='city'
                                                    value={formik.values.city}
                                                    onChange={formik.handleChange}
                                                    error={formik.touched.city && Boolean(formik.errors.city)}
                                                    helperText={formik.touched.city && formik.errors.city}
                                                    variant="outlined" placeholder='Enter your city' size='small' sx={{ width: '100%' }} />
                                            </Box>
                                            <Box sx={{ width: '50%', p: '15px 10px' }}>
                                                <p>Zip</p>
                                                <TextField id="outlined-basic"
                                                    name='zip'
                                                    value={formik.values.zip}
                                                    onChange={formik.handleChange}
                                                    error={formik.touched.zip && Boolean(formik.errors.zip)}
                                                    helperText={formik.touched.zip && formik.errors.zip}
                                                    variant="outlined" placeholder='Enter zip code' size='small' sx={{ width: '100%' }} />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ width: '100%', p: '15px 10px' }}>
                                            <p>Address</p>
                                            <TextField id="outlined-basic"
                                                name='address'
                                                value={formik.values.address}
                                                onChange={formik.handleChange}
                                                error={formik.touched.address && Boolean(formik.errors.address)}
                                                helperText={formik.touched.address && formik.errors.address}
                                                variant="outlined" placeholder='Enter your address' size='small' sx={{ width: '100%' }} />
                                        </Box>
                                    </Box>
                                </>
                            }
                            {
                                buyStep === 2 &&
                                <>
                                    <h3>Schedule Delivery</h3>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ width: '100%', p: '15px 10px' }}>
                                            <p>Dates <Box sx={{ display: 'inline', fontSize: '13px' }}>(optional)</Box></p>
                                            <Box sx={{ display: 'flex' }}>
                                                <Box sx={{ height: '40px', width: '100%', border: '1px solid rgba(0, 0, 0, 0.23)', borderRight: '0px', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px', display: 'flex', alignItems: 'center', overflowX: 'scroll', whiteSpace: 'nowrap' }} className='dateList'>
                                                    {formik.values.date.map((date, index) => {
                                                        return (
                                                            <Box sx={{ display: 'flex', alignItems: 'center', px: '5px', bgcolor: 'lightgrey', width: 'fit-content', borderRadius: '100px', height: '30px', mx: '5px' }} key={index}>
                                                                <p style={{ paddingLeft: '5px' }}>{date}</p>
                                                                <IconButton onClick={() => { removeDate(index) }}>
                                                                    <CloseRoundedIcon />
                                                                </IconButton>
                                                            </Box>
                                                        )
                                                    })}
                                                </Box>
                                                <TextField id="outlined-basic" type='date'
                                                    name='date'
                                                    value={formik.values.date}
                                                    onChange={(e) => { addDate(e.target.value) }}
                                                    error={formik.touched.date && Boolean(formik.errors.date)}
                                                    helperText={formik.touched.date && formik.errors.date}
                                                    variant="outlined" size='small' sx={{ width: '48px', borderRight: '0px' }} className='dateselectInput' />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ width: '100%', p: '15px 10px' }}>
                                            <p>Note <Box sx={{ display: 'inline', fontSize: '13px' }}>(optional)</Box></p>
                                            <TextField id="outlined-basic"
                                                name='note'
                                                value={formik.values.note}
                                                onChange={formik.handleChange}
                                                error={formik.touched.note && Boolean(formik.errors.note)}
                                                helperText={formik.touched.note && formik.errors.note}
                                                variant="outlined" placeholder='Enter your note' size='small' sx={{ width: '100%' }} />
                                        </Box>
                                    </Box>
                                </>
                            }
                            {
                                buyStep === 3 &&
                                <>
                                    <h3>Payment Method</h3>
                                    <Box sx={{ mb: '18.5px' }}>
                                        <FormControl sx={{ width: '100%' }}>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name='paymentMethod'
                                                value={formik.values.paymentMethod}
                                                onChange={formik.handleChange}
                                                error={formik.touched.paymentMethod && Boolean(formik.errors.paymentMethod)}
                                                helperText={formik.touched.paymentMethod && formik.errors.paymentMethod}
                                                sx={{ justifyContent: 'space-around', display: 'flex' }}
                                            >
                                                <FormControlLabel value="Online Payment" control={<Radio />} label="Online Payment" />
                                                <FormControlLabel value="Cash on Delivery" control={<Radio />} label="Cash on Delivery" />
                                                <FormControlLabel value="POS on Delivery" control={<Radio />} label="POS on Delivery" />
                                            </RadioGroup>
                                            <Box sx={{textAlign:'center', color:'#d32f2f', fontSize:'12px'}}>{formik.touched.paymentMethod && formik.errors.paymentMethod}</Box>
                                        </FormControl>
                                    </Box>
                                </>
                            }
                            {
                                buyStep === 4 &&
                                <>
                                    <Box sx={{ mb: '18.5px', textAlign: 'center' }}>
                                        <img src={OrderConfirm} alt="OrderConfirm Image" width={'300px'} />
                                        <h3>Thank You</h3>
                                        <h3>Your Order Confirmed</h3>
                                    </Box>
                                </>
                            }
                            <Box sx={{ justifyContent: `${buyStep !== 1 ? 'space-between' : 'right'}`, px: '10px', display: 'flex' }}>
                                {buyStep !== 1 && buyStep !== 4 &&
                                    <Button sx={{ fontWeight: 'bold' }} onClick={() => { setBuyStep(state => state - 1) }}><ArrowBackIcon />Previous</Button>
                                }
                                {buyStep !== 3 && buyStep !== 4 &&
                                    <Button sx={{ fontWeight: 'bold' }} type='submit' onClick={() => { }}>Next <ArrowForwardIcon /></Button>
                                }
                                {buyStep === 3 &&
                                    <Button variant='contained' type='submit' sx={{ fontWeight: 'bold' }} onClick={() => {  }}>Confirm Order</Button>
                                }
                            </Box>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}