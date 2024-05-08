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
import Banner from "./layout/Banner";
import { useLocation, useParams } from "react-router-dom";
import CategorySection from "./layout/CategorySection";
import Features from "./layout/Features";
import { Container, FormControlLabel, FormGroup, Grid } from "@mui/material";
import Banner2 from "./layout/Banner2"
import Checkbox from "@mui/material/Checkbox";
import InputSlider from "./layout/InputSlider";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const maxPrice = 1000000;
const Home = () => {
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

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    const params = new URLSearchParams(`?page=${currentPage}`);
    dispatch(getProducts(params));
  }, [dispatch, alert, error, currentPage]);
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

  // console.log(products);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Shop sách online"} />
          {ishome && (
            <Banner2/>
            // <Banner
            //   src="/images/banner/banner.png"
            //   search="true"
            //   text="Mang đến tri thức cho bạn"
            //   text2="Vận chuyển đến bạn tất cả các ngày trong tuần"
            // />
          )}
          {ishome && <CategorySection setCatagory={setCatagory}/>}
          {ishome ? (
            <div class="col-lg-12 mt-5">
              <div class="section-head-style-one">
                <h2>Các cuốn sách best seller!</h2>
                <p>Các cuốn sách được độc giả yêu thích nhất</p>
              </div>
            </div>
          ) : (
            <>
              {
                // <Banner
                //   src="https://res.cloudinary.com/hba-solver/image/upload/v1657882267/banner/bg2_a9w4ja.png"
                //   search="false"
                //   text="Search Items"
                // />
              }
              <div class="col-lg-12 mt-100">
                <div class="section-head-style-one">
                  <h2>Danh sách sản phẩm</h2>
                </div>
              </div>
            </>
          )}

        <Container>
            {keyword ? (
                <Fragment>
                  <Grid container>
                    <Grid item md={3} my={3}>
                    <div className="px-5">
                    <InputSlider price={price} setPrice={setPrice}/>
                      {/* <Range
                        marks={{
                          1: `$1`,
                          1000000: `${maxPrice}`,
                        }} 
                        min={1}
                        max={maxPrice}
                        defaultValue={[1, maxPrice]}
                        tipFormatter={(value) => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      /> */}

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

                        {/* <ul className="pl-0">
                          {category.map((category) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={category._id}
                              onClick={() => setCatagory(category.name)}
                            >
                              {category.name}
                            </li>
                          ))}
                        </ul> */}
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
              ) : (
                <>
                  <ProductList products={products} col={2.4}/>
                </>
              )}
          </Container>

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

          <Features />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
