import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setProductsList } from "./slice";

export const getCategory = createAsyncThunk(
    'getCategory',
    async () => {
        try {
            const result = await axios({
                method: "GET",
                url: "https://fakestoreapi.com/products/categories",
            })
            console.log('getCategory',result.data);
            return result.data
        } catch (error) {
            console.log(error);
        }
    }
)

export const getAllProducts = createAsyncThunk(
    'getAllProducts',
    async (data,thunkApi) => {
        try {
            const result = await axios({
                method: "GET",
                url: "https://fakestoreapi.com/products",
            })
            console.log('getAllProducts',result.data);
            thunkApi.dispatch(setProductsList(result.data))
            return result.data
        } catch (error) {
            console.log(error);
        }
    }
)

export const getProductDetails = createAsyncThunk(
    'getProductDetails',
    async (id) => {
        try {
            const result = await axios({
                method: "GET",
                url: `https://fakestoreapi.com/products/${id}`,
            })
            console.log('getProductDetails',result.data);
            return result.data
        } catch (error) {
            console.log(error);
        }
    }
)

export const getSpecificProducts = createAsyncThunk(
    'getSpecificProducts',
    async (category,thunkApi) => {
        try {
            const result = await axios({
                method: "GET",
                url: `https://fakestoreapi.com/products/category/${category}`,
            })
            console.log('getSpecificProducts',result.data);
            thunkApi.dispatch(setProductsList(result.data))
            return result.data
        } catch (error) {
            console.log(error);
        }
    }
)

export const getAllCarts = createAsyncThunk(
    'getAllCarts',
    async (data,thunkApi) => {
        try {
            const result = await axios({
                method: "GET",
                url: `https://fakestoreapi.com/carts`,
            })
            console.log('getAllCarts',result.data);
            thunkApi.dispatch(setProductsList(result.data))
            return result.data
        } catch (error) {
            console.log(error);
        }
    }
)