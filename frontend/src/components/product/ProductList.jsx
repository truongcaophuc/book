import { Grid, ratingClasses } from '@mui/material'
import React, { Fragment } from 'react'
import Product from './Product'

const ProductList = ({products, col}) => {

    const productData = products;
    console.log(productData)
  return (
    <Fragment >
       {productData ? 
       <>
        <Grid container rowSpacing={{xs:3, sm:3, md:3}} columnSpacing={{xs:1, sm:1.5, md: 2}}>      
            { productData.map((product)=> (
                <Grid m={0} p={0} item xs={6} sm={4} md={col} >
                    <Product key={product.id} product={product}/>
                </Grid>
            ))}
        </Grid>
       </> : <></>}
    </Fragment>
  )
}

export default ProductList