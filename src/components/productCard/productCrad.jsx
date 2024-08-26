import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { addWishList, removeWishList, setPreviewParent } from '../../services/slice';
import './productCard.scss';

function ProductCard({ product, pageType }) {
    const [rating, setRating] = useState(product.rating.rate)
    const dispatch = useDispatch()
    const wishList = useSelector(state => state.product.wishList)
    const isWished = wishList.some(obj => {
        return obj.id === product.id
    })
    const history = useHistory()

    function handleAddCart() {
        const newProduct = { ...product };
        dispatch(addWishList(newProduct))
    }

    return (
        <>
            <Card sx={{ borderRadius: '50px', p: '10px', height: '100%', position: 'relative', textAlign: 'center', boxFlexGroup: 'rgba(255, 255, 255, 0.1)', bgcolor: 'white' }}>
                <CardHeader
                    sx={{ pb: '0px' }}
                    avatar={
                        <IconButton>
                            <Link to={`/preview/${product.id}`}>
                                <div className='headerIcon' onClick={() => { dispatch(setPreviewParent(pageType === 'shop' ? 'shop' : 'wishList')) }}>
                                    <ZoomOutMapIcon />
                                </div>
                            </Link>
                        </IconButton>
                    }
                    action={pageType === 'shop' ?
                        <IconButton className='addCartIcon' onClick={() => { isWished ? dispatch(removeWishList(product.id)) : handleAddCart() }} >
                            <Box className='headerIcon' sx={{ borderColor: 'transparent' }}>
                                {isWished ?
                                    <FavoriteIcon sx={{ color: 'red' }} />
                                    :
                                    <FavoriteBorderIcon/>
                                }
                            </Box>
                        </IconButton>
                        :
                        <IconButton className='addCartIcon' onClick={() => { dispatch(removeWishList(product.id)) }}>
                            <div className='headerIcon'>
                                <CloseIcon />
                            </div>
                        </IconButton>
                    }
                />
                <div className='cardImageDiv'>
                    {/* <div className='cardBackground1'></div>
                    <div className='cardBackground2'></div> */}
                    <CardMedia
                        component="img"
                        height="150"
                        image={product.image}
                        alt="Paella dish"
                        sx={{ objectFit: 'contain', zIndex: 1, position: 'absolute', cursor: 'pointer' }}
                        className='shopcardImage'
                        onClick={() => { dispatch(setPreviewParent(pageType === 'shop' ? 'shop' : 'wishList')); history.push(`/preview/${product.id}`) }}
                    />
                </div>
                <Box sx={{ height: '150px' }}></Box>
                <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly size='small' sx={{ paddingTop: '16px' }} />
                <CardContent sx={{ pt: 0, pb: '5px !important' }}>
                    <Typography variant="h6" color="black" textAlign={'center'}>
                        <p className='productTitle'>{product.title}</p>
                        <p className='productPrice'>₹{product.price}</p>
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}
export default ProductCard