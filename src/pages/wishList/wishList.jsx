import './wishList.scss'
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../services/thunkFunctions';
import ProductCard from '../../components/productCard/productCrad';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import Loader from '../../components/loader/loader';
// import { getSpecificProducts } from '../../services/thunkFunctions';
import { setWishListSorting, sortWishList } from '../../services/slice';

function WishList() {
    const wishList = useSelector(state => state.product.wishList);
    const dispatch = useDispatch()
    // const [isLoading, setIsLoading] = useState(false)
    const sorting = useSelector(state => state.product.wishListSorting)
    // const selectedCategory = useSelector(state => state.product.selectedCategory)
    const count = wishList.length;
    const theme = useSelector(state => state.product.theme)

    // useEffect(() =>{ (async () => {
    //     let result
    //     if (selectedCategory === 'All') {
    //         result = await dispatch(getAllProducts())
    //     }
    //     else {
    //         let newName = ''
    //         selectedCategory.split(' ').forEach(namePart => {
    //             newName += namePart[0].toLowerCase() + namePart.slice(1) + ' '
    //         })
    //         result = await dispatch(getSpecificProducts(newName))
    //     }
    //     sortList(sorting,[...result.payload])
    // })()}, [selectedCategory])

    function sortList(sorting, list = [...wishList]) {
        if (sorting === 'Rating') {
            list.sort(function (a, b) { return a.rating.rate - b.rating.rate });
        }
        else if (sorting === 'Price') {
            list.sort(function (a, b) { return a.price - b.price });
        }
        else {
            list.sort(function (a, b) { return a.id - b.id });
        }
        dispatch(sortWishList(list))
        // setIsLoading(false)
        dispatch(setWishListSorting(sorting))
    }

    return (
        <>
            <div className='shopPageOuter'>
                <div className='shopPage'>
                    <div className={`shopHeadingOuter ${theme === 'light' ? 'bgColorDark' : 'bgColorLight'}`}>
                        <div className='shopHeading'>
                            <div className='subFlex'>
                                <div className='productDiv'>
                                    <p className='productText'>Products</p>
                                </div>
                                <div className='shopTitleDiv'>
                                    <h1 className='shopTitle'>Wish List</h1>
                                </div>
                            </div>
                            <div className='shopHeaderResult'>
                                {count ?
                                    <>
                                        <p className='shopResult'>Showing 1-{count} of {count} results</p>
                                        <div>
                                            <FormControl sx={{ m: 1, mr: 0, minWidth: 160, maxWidth: 160, border: '1px solid white', borderRadius: '5px', textAlign: 'center' }} size='small'>
                                                <Select
                                                    value={sorting}
                                                    onChange={(e) => { sortList(e.target.value) }}
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label', sx: { color: 'white' } }}
                                                >
                                                    <MenuItem value="">
                                                        <em>Default Sorting</em>
                                                    </MenuItem>
                                                    <MenuItem value={'Rating'}>Rating for the products  </MenuItem>
                                                    <MenuItem value={'Price'}>Price</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </>
                                    :
                                    <p className='shopResult'>Your wish list is empty</p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='divider'></div>
                    <div className='productsList'>
                        {
                            // isLoading ?
                            // <div className='shopLoader'>
                            //     <Loader />
                            // </div>
                            // :
                            <Grid container spacing={{ lg: 5, xl: 10 }} sx={{ overflowY: 'scroll', p: 0, mt: { xs: '0px' } }} className='productListGrid'>
                                {wishList.map(obj => {
                                    return (
                                        <Grid item xs={4} md={6} lg={4} className='productGrid' key={obj.id}>
                                            <ProductCard product={obj} pageType={'wishList'} />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default WishList