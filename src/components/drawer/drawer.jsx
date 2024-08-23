import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Home from '../../pages/home/home';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../services/thunkFunctions';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import './drawer.scss';
import Shop from '../../pages/shop/shop';
import { Link, useHistory } from 'react-router-dom';
import Preview from '../../pages/preview/preview';
import TungstenIcon from '@mui/icons-material/Tungsten';
import DiamondIcon from '@mui/icons-material/Diamond';
import WomanIcon from '@mui/icons-material/Woman';
import ManIcon from '@mui/icons-material/Man';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import { setSelectedCategory } from '../../services/slice';
import About from '../../pages/about/about';
import Cart from '../../pages/cart/cart';
import ThemeButton from '../themeButton/themeButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WishList from '../../pages/wishList/wishList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer(props) {
    // const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const [category, setCategory] = useState([])
    const theme = useSelector(state => state.product.theme);
    // const drawerIconColor = theme === 'light' ? 'black' : 'white'
    const drawerIcons = [<GroupWorkIcon sx={{ color: 'white' }} />, <TungstenIcon sx={{ color: 'white' }} />, <DiamondIcon sx={{ color: 'white' }} />, <ManIcon sx={{ color: 'white' }} />, <WomanIcon sx={{ color: 'white' }} />]
    const selectedCategory = useSelector(state => state.product.selectedCategory)
    const [profileOpen, setProfileOpen] = useState(null)
    const profilePopOpen = Boolean(profileOpen);
    const id = profilePopOpen ? 'simple-popover' : undefined;
    const history = useHistory()
    const previewParent = useSelector(state => state.product.previewParent)
    const cartList = useSelector(state => state.product.cartList)

    const handleProfileClick = (event) => {
        setProfileOpen(event.currentTarget);
    };

    const handleProfileClose = () => {
        setProfileOpen(null);
      };    

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    async function changeCategory(name) {
        dispatch(setSelectedCategory(name))
        history.push('/shop')
    }

    useEffect(() => async () => {
        const result = await dispatch(getCategory())
        const category = ['All'];
        result.payload.forEach((name) => {
            let tempName = ''
            name.split(' ').forEach(namePart => {
                tempName += namePart[0].toUpperCase() + namePart.slice(1) + ' '
            })
            category.push(tempName.trim())
        })
        setCategory(category)
    }, [])

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {
                props.page === 'shop' &&
                <Drawer variant="permanent" open={open} PaperProps={{ sx: { color: "white", backgroundColor: `${theme === 'light' ? 'rgb(0,0,0)' : 'rgb(121,88,149)'}`, borderRight: '1px solid white' } }}>
                    <DrawerHeader sx={{ backgroundColor: `${theme === 'light' ? 'rgb(0,0,0)' : 'rgb(121,88,149)'}`, borderBottom: '1px solid white' }}>
                        {
                            open ?
                                <>
                                    <Box sx={{ textAlign: 'center', width: '100%', fontSize: '30px' }}>Categories</Box>
                                    <IconButton onClick={handleDrawerClose} color='inherit'>
                                        <ChevronLeftIcon />
                                    </IconButton>
                                </>
                                :
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start"
                                    sx={{
                                        ...(open && { display: 'none' })
                                    }}
                                >
                                    <MenuIcon sx={{ mr: '3px' }} />
                                </IconButton>
                        }
                    </DrawerHeader>
                    <Divider />
                    <List sx={{ backgroundColor: `${theme === 'light' ? 'rgb(0,0,0)' : 'rgb(121,88,149)'}` }}>
                        {category.map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }} className={`${theme === 'light' ? '' : ''} ${text === selectedCategory ? theme === 'light' ? 'bgColorDarkActive' : 'bgColorLightActive' : ''}`} onClick={() => { changeCategory(text) }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {drawerIcons[index]}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            }
            <Box component="main" sx={{ flexGrow: 1 }}>
                <div className={`homePage ${theme === 'light' ? 'bgDark' : 'bgLight'}`}>
                    <div className="homeBannerOuter">
                        <div className="homeBanner">
                            <div className='homeHeader'>
                                <div className='homeHeaderLogo'>
                                    <ShoppingCartRoundedIcon className='shoppingIcon' />
                                    <div>
                                        <p className='shoppingIconTitle1'>Smart</p>
                                        <p className='shoppingIconTitle2'>Shopping</p>
                                    </div>
                                </div>
                                <div className={`homeHeaderTabs`}>
                                    <Link to='/'><p className={`headerHomeTab ${props.page === 'home' ? 'activeTab' : ''} ${theme === 'light' ? 'colorBlack' : 'colorWhite'}`}>Home</p></Link>
                                    <Link to='/shop'><p className={`headerShopTab ${props.page === 'shop' || (props.page === 'preview' && previewParent === 'shop') ? 'activeTab' : ''} ${theme === 'light' ? 'colorBlack' : 'colorWhite'}`}>Shop</p></Link>
                                    <Link to='/about'><p className={`headerAboutTab ${props.page === 'about' ? 'activeTab' : ''} ${theme === 'light' ? 'colorBlack' : 'colorWhite'}`}>About</p></Link>
                                </div>
                                <div className='headerIcons'>
                                    <div>
                                        <ThemeButton />
                                    </div>
                                    <Link to='/cart' className='Link'>
                                        <div className={`headerSideIcon ${props.page === 'cart' ? 'activeTab' : ''}`} >
                                            <Badge badgeContent={cartList.length} color="primary">
                                                <ShoppingCartIcon />
                                            </Badge>
                                        </div>
                                    </Link>
                                    <Link to='/wishList' className='Link'>
                                        <Box className={`headerSideIcon ${props.page === 'wishList' || (props.page === 'preview' && previewParent === 'wishList') ? 'activeTab' : ''}`} sx={{ display: 'flex' }} >
                                            <FavoriteRoundedIcon />
                                        </Box>
                                    </Link>
                                    <Box className='headerSideIcon profileTab' sx={{ display: 'flex' }} onClick={(e) => { handleProfileClick(e) }} >
                                        <AccountCircleRoundedIcon />
                                    </Box>
                                    <Popover
                                        id={'profilePop'}
                                        open={profilePopOpen}
                                        anchorEl={profileOpen}
                                        onClose={handleProfileClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <Typography sx={{ p: 2 }}>Hi, Lenin Bevan</Typography>
                                    </Popover>
                                </div>
                            </div>
                            {props.page === 'home' && <Home />}
                            {props.page === 'shop' && <Shop />}
                            {props.page === 'preview' && <Preview />}
                            {props.page === 'about' && <About />}
                            {props.page === 'cart' && <Cart />}
                            {props.page === 'wishList' && <WishList />}
                        </div>
                    </div>
                </div>
            </Box>
        </Box>
    );
}