import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    shopSorting: '',
    wishListSorting: '',
    selectedCategory: 'All',
    productsList: [],
    cartList: [],
    theme: 'dark',
    previewParent: '',
    wishList: [],
    modalOpen: false,
}

export const counterSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setShopSorting: (state, value) => {
            state.shopSorting = value.payload
        },
        setWishListSorting: (state, value) => {
            state.wishListSorting = value.payload
        },
        setSelectedCategory: (state, value) => {
            state.selectedCategory = value.payload
        },
        setProductsList: (state, value) => {
            state.productsList = value.payload
        },
        addCart: (state, value) => {
            value.payload.count = 1;
            value.payload.totalPrice = 1 * value.payload.price
            state.cartList.push(value.payload)
        },
        removeCart: (state, { payload }) => {
            const index = state.cartList.findIndex(obj => {
                return obj.id === payload
            });
            if (index >= 0) {
                state.cartList.splice(index, 1)
            }
        },
        sortCart: (state, { payload }) => {
            state.cartList = payload
        },
        changeTheme: (state, { payload }) => {
            state.theme = payload
        },
        setPreviewParent: (state, { payload }) => {
            state.previewParent = payload
        },
        changeCartCount: (state, { payload }) => {
            const index = state.cartList.findIndex(obj => {
                return obj.id === payload.id
            });
            if (!/[^0-9]/.test(payload.value)) {
                if (payload.value < 1) {
                    state.cartList[index].count = 1;
                }
                else if (payload.value > 100) {
                    state.cartList[index].count = 100;
                }
                else {
                    state.cartList[index].count = payload.value;
                }
                state.cartList[index].totalPrice = state.cartList[index].count * state.cartList[index].price
            }
        },
        addWishList: (state, value) => {
            state.wishList.push(value.payload)
        },
        removeWishList: (state, { payload }) => {
            const index = state.wishList.findIndex(obj => {
                return obj.id === payload
            });
            // if (index >= 0) {
            //     state.cartList.splice(index, 1)
            // }
            state.wishList.splice(index, 1)
        },
        sortWishList: (state, { payload }) => {
            state.wishList = payload
        },
        setModalOpen: (state, { payload }) => {
            state.modalOpen = payload
        }
    },
})

export const { setWishListSorting, setShopSorting, setSelectedCategory, setProductsList, addCart, removeCart, sortCart, changeTheme, setPreviewParent, changeCartCount, addWishList, removeWishList, sortWishList, setModalOpen } = counterSlice.actions

export default counterSlice.reducer 