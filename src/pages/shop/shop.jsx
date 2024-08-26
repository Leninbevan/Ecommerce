import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/loader';
import ProductCard from '../../components/productCard/productCrad';
import { setShopSorting } from '../../services/slice';
import { getAllProducts, getSpecificProducts } from '../../services/thunkFunctions';
import './shop.scss';

function Shop() {
    const [productsList, setProductsList] = useState([]);
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const sorting = useSelector(state => state.product.shopSorting)
    const selectedCategory = useSelector(state => state.product.selectedCategory)
    const count =productsList.length
    const theme=useSelector(state=>state.product.theme)

    useEffect(() =>{ (async () => {
        let result
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
        sortList(sorting,[...result.payload])
    })()}, [selectedCategory])

    function sortList(sorting,list=[...productsList]) {
        if (sorting === 'Rating') {
            list.sort(function (a, b) { return a.rating.rate - b.rating.rate });
        }
        else if (sorting === 'Price') {
            list.sort(function (a, b) { return a.price - b.price });
        }
        else {
            list.sort(function (a, b) { return a.id - b.id });
        }
        setProductsList(list)
        setIsLoading(false)
        dispatch(setShopSorting(sorting))
    }

    return (
        <>
            <div className='shopPageOuter'>
                <div className='shopPage'>
                    <div className={`shopHeadingOuter ${theme==='light' ? 'bgColorDark' : 'bgColorLight'}`}>
                        <div className='shopHeading'>
                            <div className='subFlex'>
                                <div className='productDiv'>
                                    <p className='productText'>Products</p>
                                </div>
                                <div className='shopTitleDiv'>
                                    <h1 className='shopTitle'>Shop</h1>
                                </div>
                            </div>
                            <div className='shopHeaderResult'>
                                <p className='shopResult'>Showing 1-{count} of {count} results</p>
                                <div>
                                    <FormControl sx={{ m: 1, mr: 0, minWidth: 160, maxWidth: 160, border: '1px solid white', borderRadius: '5px', textAlign:'center' }} size='small'>
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
                            </div>
                        </div>
                    </div>
                    <div className='divider'></div>
                    <div className='productsList'>
                        {
                            isLoading ?
                                <div className='shopLoader'>
                                    <Loader />
                                </div>
                                :
                                <Grid container spacing={{ lg: 5, xl: 10 }} sx={{ overflowY: 'scroll', p: 0, mt:{xs:'0px'} }} className='productListGrid'>
                                    {productsList.map(obj => {
                                        return (
                                            <Grid item xs={4} md={6} lg={4} className='productGrid' key={obj.id}>
                                                <ProductCard product={obj} pageType={'shop'} />
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
export default Shop