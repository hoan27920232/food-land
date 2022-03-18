import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cartItems: localStorage.getItem("cartItems")
    ?JSON.parse(localStorage.getItem("cartItems"))
    :[],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        removeAllCart(state,action){
            state.cartItems = []
            state.cartTotal = 0
            state.cartTotalAmount = 0
        },
        addToCard(state,action){
            const itemIndex=state.cartItems.findIndex(
                (item)=>item.slug===action.payload.slug);
            if(itemIndex >=0){
                if((state.cartItems[itemIndex].cartQuantity + action.payload.quantity)<state.cartItems[itemIndex].SoLuong+1){
                    state.cartItems[itemIndex].cartQuantity += action.payload.quantity;
                }else{
                     state.cartItems[itemIndex].cartQuantity=state.cartItems[itemIndex].SoLuong;
                }
                
                             
            }
            else{
                let tempProduct={...action.payload, cartQuantity:action.payload.quantity };
                state.cartItems.push(tempProduct);
            }
            
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
        },
        removeFromCart(state, action){
            const nextCartItems = state.cartItems.filter(
                cartItems => cartItems.slug !== action.payload.slug
            );
            state.cartItems= nextCartItems;
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
        },
        decreaseCart(state,action){
            const itemIndex = state.cartItems.findIndex(
                (cartItem) => cartItem.slug === action.payload.slug
            );
            if(state.cartItems[itemIndex].cartQuantity >1){
                state.cartItems[itemIndex].cartQuantity -=1;
            }
            else if(state.cartItems[itemIndex].cartQuantity ===1){
                const nextCartItems = state.cartItems.filter(
                    cartItems => cartItems.slug !== action.payload.slug
                );
                state.cartItems= nextCartItems;
                
            }
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
        },
        getTotals(state,action){
            let{total, quantity} =state.cartItems.reduce(
                (cartTotal, cartItem) => {
                const { DonGia, cartQuantity } = cartItem;
                const itemTotal = DonGia * cartQuantity;

                cartTotal.total += itemTotal
                cartTotal.quantity +=cartQuantity

                return cartTotal;
            },
            {
                total: 0,
                quantity: 0,
            });
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount= total;
        }
    },
});

export const {addToCard,removeFromCart, decreaseCart, getTotals, removeAllCart}=cartSlice.actions;
export default  cartSlice.reducer;