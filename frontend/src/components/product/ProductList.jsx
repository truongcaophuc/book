import { Grid, ratingClasses } from '@mui/material'
import React from 'react'
import Product from './Product'

const ProductList = ({products, col}) => {
    console.log("Loai du lieu", typeof(products))

    const productData = products;
    
  return (
    
    <Grid container rowSpacing={{xs:3, sm:3, md:3}} columnSpacing={{xs:1, sm:1.5, md: 2}}>      
        {productData.map((product)=> (
            <Grid m={0} p={0} item xs={6} sm={4} md={2.4} >
                <Product key={product.id} product={product}/>
            </Grid>
        ))}
    </Grid>
  )
}

export default ProductList