import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Item from './Items/Items'
import Cart from './Cart/Cart'
//Components

import Drawer from '@material-ui/core/Drawer'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import AddShoppingCartOutlined from '@material-ui/icons/AddShoppingCartOutlined'
import Badge from '@material-ui/core/Badge'

// styles
import { Wrapper, StyledButton } from './App.styles'


export type CartItemType = {
  id: number,
  category: string,
  description: string,
  image: string,
  price: number,
  title: string,
  amount: number;
}


const getProducts = async (): Promise<CartItemType[]> => {
  return await (await fetch('https://fakestoreapi.com/products')).json()
}


const App = () => {


  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])


  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts)


  const getTotalItems = (items: CartItemType[]) => {
    return items.reduce((ack: number, item) => ack + item.amount, 0)
  }

  const handleAddToCart = (clickedItem: CartItemType) => null

  const handleRemoveFromCart = () => null

  if (isLoading) return <LinearProgress />
  if (error) return <div> Something went wrong... </div>

  return (
    <Wrapper>

      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)} >
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>

      <StyledButton onClick={() => setCartOpen(true)} >
        <Badge badgeContent={getTotalItems(cartItems)} color='error' />
        <AddShoppingCartOutlined />
      </StyledButton>

      <Grid container spacing={3} >

        {data?.map((item => (
          <Grid key={item.id} xs={12} sm={4} >
            <Item item={item} handleAddToCart={handleAddToCart} />

          </Grid>
        )))}

      </Grid>
    </Wrapper>
  )
}

export default App