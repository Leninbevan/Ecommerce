import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Rating from '@mui/material/Rating';
import { Box } from '@mui/system';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import Loader from '../../components/loader/loader';
import { addCart } from '../../services/slice';
import { getAllProducts, getProductDetails, getSpecificProducts } from '../../services/thunkFunctions';
import './preview.scss';

function Preview() {
    const params = useParams()
    const dispatch = useDispatch()
    const [productDetails, setProductDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [imgRotate, setImgRotate] = useState('')
    const [activeColor, setActiveColor] = useState('blue')
    const [limit, setLimit] = useState(0)
    const selectedCategory = useSelector(state => state.product.selectedCategory)
    // const productList = useSelector(state => state.product.cartList)
    const [productList, setProductList] = useState(useSelector(state=>state.product.wishList))
    const history = useHistory()
    const previewParent = useSelector(state => state.product.previewParent)
    const sorting = useSelector(state => state.product[previewParent==='shop' ? 'shopSorting' : 'wishListSorting'])
    let tempImgRotate = '';
    const theme = useSelector(state => state.product.theme)
    const cartList = useSelector(state => state.product.cartList)
    const [selectedSize, setSelectedSize] = useState(37)
    const isCart = cartList.some(obj => {
        return obj.title === productDetails.title && obj.color === activeColor[0].toUpperCase() + activeColor.slice(1) && obj.size === selectedSize
    })

    function changeImgRotate(value) {
        setImgRotate(value);
    }

    function changeActiveColor(value) {
        setActiveColor(value)
    }

    function nextProduct() {
        const index = productList.findIndex(obj => {
            return obj.id === +params.id
        })
        history.push(`/preview/${productList[index + 1].id}`)
        // if (index + 1 < productList.length) {
        //     console.log(productList);
        //     history.push(`/preview/${productList[index + 1].id}`)
        // }
        // else if (+params.id === productList[0]?.id) {
        //     history.push('/cart')
        // }
        // else {
        //     previousProduct()
        // }
    }

    function previousProduct() {
        const index = productList.findIndex(obj => {
            return obj.id === +params.id
        })
        history.push(`/preview/${productList[index - 1].id}`)
    }

    useEffect(() => {
        (async () => {
            let result = await dispatch(getProductDetails(params.id))
            setIsLoading(false)
            setProductDetails(result.payload)

            if (previewParent === 'shop') {
                if (selectedCategory === 'All') {
                    result = await dispatch(getAllProducts())
                }
                else {
                    let newName = ''
                    selectedCategory.split(' ').forEach(namePart => {
                        newName += namePart[0].toLowerCase() + namePart.slice(1) + ' '
                    })
                    result = await dispatch(getSpecificProducts(newName))
                }
                result = result.payload;
            }
            else {
                result = productList
            }
            sortList([...result])
        })()
    }, [params])

    useEffect(() => {
        const imageRotation = setInterval(() => {
            if (tempImgRotate === '') {
                setImgRotate('rotate45')
                tempImgRotate = 'rotate45';
            }
            else if (tempImgRotate === 'rotate45') {
                setImgRotate('rotate90')
                tempImgRotate = 'rotate90';
            }
            else {
                setImgRotate('')
                tempImgRotate = '';
            }
        }, 5000);

        return () => clearInterval(imageRotation);
    }, [])

    function sortList(list) {
        if (sorting === 'Rating') {
            list.sort(function (a, b) { return a.rating.rate - b.rating.rate });
        }
        else if (sorting === 'Price') {
            list.sort(function (a, b) { return a.price - b.price });
        }
        else {
            list.sort(function (a, b) { return a.id - b.id });
        }
        setLimit(list[list.length - 1].id)
        // dispatch(sortCart(list))
        setProductList(list)
    }

    function handleAddCart() {
        const newProduct = { ...productDetails, color: activeColor[0].toUpperCase() + activeColor.slice(1), size: selectedSize, id: cartList.length + 1 };
        dispatch(addCart(newProduct))
    }

    return (
        <>
            <div className='previewPageOuter'>
                <div className='previewPage'>
                    <div className={`previewHeadingOuter ${theme === 'light' ? 'bgColorDark' : 'bgColorLight'}`}>
                        <div className='previewHeading'>
                            <div className='subFlex'>
                                <div className='productDiv'>
                                    <Link to={`/${previewParent}`} className='link'>
                                        <div className='backButton'>
                                            <ArrowBackIcon />
                                            <p className='productText'>Back</p>
                                        </div>
                                    </Link>
                                </div>
                                <div className='shopTitleDiv'>
                                    <h1 className='shopTitle'>Product</h1>
                                </div>
                            </div>
                            <div className='previewHeaderResult'>
                                <div onClick={() => { previousProduct() }} className={`Link ${+params.id === productList[0]?.id ? 'opacity0-5 pointerNone' : ''}`}>
                                    <div className='nextArrow leftArrow'>
                                        <ArrowBackIosIcon />
                                        <p className='skipButton'>Previous</p>
                                    </div>
                                </div>
                                <div onClick={() => { nextProduct() }} className={`Link ${+params.id === limit ? 'opacity0-5 pointerNone' : ''}`}>
                                    <div className='nextArrow rightArrow'>
                                        <p className='skipButton nextSkipButton'>Next</p>
                                        <ArrowForwardIosIcon />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='divider'></div>
                    <div className='productDetailsOuter'>
                        {
                            isLoading ?
                                <div className='shopLoader'>
                                    <Loader />
                                </div>
                                :
                                <div className='productDetails'>
                                    <Grid container spacing={3} sx={{ p: 0, mt: { xs: '0px' } }} className='productDetailsGrid'>
                                        <Grid item xs={4} md={6} lg={4} className=''>
                                            <h1 className='productName'>{productDetails.title}</h1>
                                            <p className='productDis'>{productDetails.description}</p>
                                            <div className='imageList'>
                                                <div className='sampleImage' onClick={() => changeImgRotate('')}>
                                                    <img className='' src={productDetails.image} width={'50px'} height={'50px'} alt="" />
                                                </div>
                                                <div className='sampleImage' onClick={() => changeImgRotate('rotate45')}>
                                                    <img className='rotate45' src={productDetails.image} width={'50px'} height={'50px'} alt="" />
                                                </div>
                                                <div className='sampleImage' onClick={() => changeImgRotate('rotate90')}>
                                                    <img className='rotate90' src={productDetails.image} width={'50px'} height={'50px'} alt="" />
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} md={6} lg={4} className=''>
                                            <div className='imagePart'>
                                                <div className='productImageOuter'>
                                                    <div className='productImage'>
                                                        <div className='imageDiv'>
                                                            <img className={`insideImage ${imgRotate}`} src={productDetails.image} width={'50%'} height={'100%'} alt="" />
                                                        </div>
                                                        <p className='insidePrice'>₹{productDetails.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} md={6} lg={4} className=''>
                                            <div>
                                                <div className='productRating rightSidePart'>
                                                    <p className='productReview'>Review: </p>
                                                    <Rating name="half-rating-read" defaultValue={productDetails.rating.rate} precision={0.5} readOnly size='small' />
                                                    <p className='productCount'>{productDetails.rating.rate} ({productDetails.rating.count})</p>
                                                </div>
                                                <div className='productColor rightSidePart'>
                                                    <p>Color:</p>
                                                    <div className={`colorOuter ${activeColor === 'blue' ? 'blueOuter' : ''}`}>
                                                        <div className='color blue' onClick={() => changeActiveColor('blue')}></div>
                                                    </div>
                                                    <div className={`colorOuter ${activeColor === 'red' ? 'redOuter' : ''}`}>
                                                        <div className='color red' onClick={() => changeActiveColor('red')}></div>
                                                    </div>
                                                    <div className={`colorOuter ${activeColor === 'yellow' ? 'yellowOuter' : ''}`}>
                                                        <div className='color yellow' onClick={() => changeActiveColor('yellow')}></div>
                                                    </div>
                                                    <div className={`colorOuter ${activeColor === 'brown' ? 'brownOuter' : ''}`}>
                                                        <div className='color brown' onClick={() => changeActiveColor('brown')}></div>
                                                    </div>
                                                </div>
                                                <div className='productSize rightSidePart'>
                                                    <p className='sizeTitle'>Size: </p>
                                                    <div>
                                                        <div className='sizeList1'>
                                                            <Box className='size' sx={{ bgcolor: `${selectedSize === 37 && (theme === 'light' ? 'black' : '#e9a4d2')}`, color: `${selectedSize === 37 && 'white'}` }} onClick={() => { setSelectedSize(37) }}>37</Box>
                                                            <Box className='size' sx={{ bgcolor: `${selectedSize === 38 && (theme === 'light' ? 'black' : '#e9a4d2')}`, color: `${selectedSize === 38 && 'white'}` }} onClick={() => { setSelectedSize(38) }}>38</Box>
                                                            <Box className='size' sx={{ bgcolor: `${selectedSize === 39 && (theme === 'light' ? 'black' : '#e9a4d2')}`, color: `${selectedSize === 39 && 'white'}` }} onClick={() => { setSelectedSize(39) }}>39</Box>
                                                        </div>
                                                        <div className='sizeList1'>
                                                            <Box className='size' sx={{ bgcolor: `${selectedSize === 40 && (theme === 'light' ? 'black' : '#e9a4d2')}`, color: `${selectedSize === 40 && 'white'}` }} onClick={() => { setSelectedSize(40) }}>40</Box>
                                                            <Box className='size' sx={{ bgcolor: `${selectedSize === 41 && (theme === 'light' ? 'black' : '#e9a4d2')}`, color: `${selectedSize === 41 && 'white'}` }} onClick={() => { setSelectedSize(41) }}>41</Box>
                                                            <Box className='size' sx={{ bgcolor: `${selectedSize === 42 && (theme === 'light' ? 'black' : '#e9a4d2')}`, color: `${selectedSize === 42 && 'white'}` }} onClick={() => { setSelectedSize(42) }}>42</Box>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Box className='addCartButton rightSidePart' sx={{ opacity: `${isCart && 0.2}`, pointerEvents: `${isCart && 'none'}` }} onClick={() => { handleAddCart() }}>
                                                    <p>{previewParent === 'shop' ? 'Add to' : 'Remove from'} Cart</p>
                                                </Box>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default Preview