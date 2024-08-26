import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Box, Grid, IconButton } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeCartCount, removeCart } from '../../services/slice';
import './cartCard.scss';

function CartCard({ product }) {
    const dispatch = useDispatch()
    const [inputChange, setInputChange] = useState(false)
    const countInputRef = useRef()
    const [countValue, setCountValue] = useState(product.count)

    useEffect(() => {
        setCountValue(product.count)
    }, [product.count])

    return (
        <>
            <Grid item xs={12} className='productGrid' key={product.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                {/* <ProductCard product={product} pageType={'cart'} /> */}

                <div className='cartProduct'>
                    <div className='cartImageOuter'>
                        <img className='cartImage' src={product.image} alt="" />
                    </div>
                    <div className='cartProductDetails'>
                        <div className='cartSelectedDetails'>
                            <h2 className='productName cartProductName'>{product.title}</h2>
                            <div className='productRating CartProductRating'>
                                <p className='productReview'>Review: </p>
                                <Rating name="half-rating-read" defaultValue={product.rating.rate} precision={0.5} readOnly size='small' />
                                <p className='productCount'>{product.rating.rate} ({product.rating.count})</p>
                            </div>
                            <p className='cartProductColor'>Color: {product.color}</p>
                            <p className='cartProductSize'>Size: {product.size}</p>
                        </div>
                        <div className='cartQtyDetails'>
                            <div>
                                <div className='quantityHandle'>
                                    <IconButton color='inherit' onClick={() => { countValue < 1 ? setCountValue(1) : dispatch(changeCartCount({ id: product.id, value: product.count - 1 })); setInputChange(false) }}>
                                        <RemoveCircleIcon />
                                    </IconButton>
                                    <p className='cartQtyCount'>
                                        Quantity:
                                        <input ref={countInputRef} className='qtyInput' type="text" value={countValue} onChange={(e) => { setInputChange(state => /[^0-9]/.test(e.target.value) ? state : true); setCountValue(state => /[^0-9]/.test(e.target.value) ? state : e.target.value) }} />
                                        {inputChange &&
                                            <Box sx={{ display: 'flex', pl: '5px', cursor: 'pointer' }} onClick={() => { dispatch(changeCartCount({ id: product.id, value: +countValue })); setInputChange(false) }}>
                                                <CheckCircleOutlineSharpIcon sx={{ color: 'green' }} />
                                            </Box>
                                        }
                                    </p>
                                    <IconButton color='inherit' onClick={() => { countValue > 100 ? setCountValue(100) : dispatch(changeCartCount({ id: product.id, value: product.count + 1 })); setInputChange(false) }}>
                                        <AddCircleIcon />
                                    </IconButton>
                                </div>
                                <div>
                                    <p className='cartTotalPrice'>Total Price: {product.totalPrice.toFixed(2)} </p>
                                </div>
                            </div>
                            <div className='addCartButton cartRemoveButton' onClick={() => { dispatch(removeCart(product.id)) }}>
                                <p>Remove Item</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>
        </>
    )
}
export default CartCard