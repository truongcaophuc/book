
import React, { Fragment, useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import ProductList from "./product/ProductList"

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getProducts } from "../actions/productActions";
import { getCategory } from "../actions/categoryActions";

import { useLocation, useParams } from "react-router-dom";
import { Container, FormControlLabel, FormGroup, Grid } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import InputSlider from "./layout/InputSlider";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const maxPrice = 1000000;

const SearchPage = () => {

    const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, maxPrice]);
  const [catagory, setCatagory] = useState("");
  const [rating, setRating] = useState(0);
  const location = useLocation();

  const { category } = useSelector((state) => state.category);

  const alert = useAlert();
  const dispatch = useDispatch();

  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const params = useParams();

  const keyword = params.keyword;
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price, catagory, rating));
  }, [dispatch, alert, error, keyword, currentPage, price, catagory, rating,params]);
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price, catagory, rating));
  }, [dispatch, alert, error, keyword, currentPage, price, catagory, rating]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }
  let ishome = false;
  if (location.pathname === "/") {
    ishome = true;
  }

  const handleChange = (catName) => {
    setCatagory(catName);
  };
  return (
    <Container>
        <Fragment>
                  <Grid container mt={10}>
                    <Grid item md={3} my={3}>
                    <div className="px-5">
                    <InputSlider price={price} setPrice={setPrice}/>

                      <hr className="my-5" />

                      <div className="mt-5">
                        <h4 className="mb-3" 
                          style={{color:"#1976d2", fontSize:"22px", fontWeight:"700"}}
                        >
                           Danh mục
                        </h4>
                        
                        <FormGroup>
                          {category.map((cat) => (
                            <FormControlLabel
                              sx={{color:"#0F0F0F"}}
                              key={cat._id}
                              control={
                                <Checkbox
                                  onChange={() => setCatagory(cat.name)}
                                  checked={catagory == cat.name}
                                />
                              }
                              label={cat.name}
                            />
                          ))}
                        </FormGroup>
                      </div>

                      <hr className="my-3" />

                      <div className="mt-5">
                        <h4 className="mb-3">Ratings</h4>

                        <ul className="pl-0">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={star}
                              onClick={() => setRating(star)}
                            >
                              <div className="rating-outer">
                                <div
                                  className="rating-inner"
                                  style={{
                                    width: `${star * 20}%`,
                                  }}
                                ></div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  
                    </Grid>
                    <Grid item md={9}>
                      <ProductList products={products} col={3}/>     
                    </Grid>
                  </Grid>
                </Fragment>

                {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
                activeLinkClass="bg-f96822"
              />
            </div>
          )}
    </Container>
  )
}

export default SearchPage