import React, { Fragment, useState, useEffect } from "react";
import { Button, Carousel } from "react-bootstrap";

import {useParams}  from "react-router-dom"
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import ListReviews from "../review/ListReviews";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getProductDetails,
  newReview,
  clearErrors,
} from "../../actions/productActions";
import { addItemToCart } from "../../actions/cartActions";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import RelatedProducts from "./RelatedProducts";
import { Box, IconButton, Link, Rating, Stack, Typography } from "@mui/material";
import { AddShoppingCartOutlined } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Modal from '@mui/material/Modal';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ProductDetails = ({ match }) => {

  const params = useParams();

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { user } = useSelector((state) => state.auth);
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );
  useEffect(() => {
    dispatch(getProductDetails(params.id));
    dispatch(getProducts());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Đánh giá của bạn đã được ghi nhận");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, alert, error, reviewError, params.id, success]);

  const addToCart = () => {
    dispatch(addItemToCart(params.id, quantity));
    setOpen(true);
  };

  const increaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= product.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  function setUserRatings() {
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");

            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }

        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  }

  const reviewHandler = () => {
    const formData = new FormData();

    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", params.id);

    dispatch(newReview(formData));
  };

  const [value, setValue] = React.useState(2);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius:"10px",
    p: 4,
    justifyContent:"center"
  };


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />

          <section className="prod-details pt-100 mt-5 mb-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="product-details-gallery">
                    <div className="row g-3">
                      <div className="col-sm-9">
                        <div className="tab-content" id="v-pills-tabContent">
                          <div
                            className="tab-pane fade show active "
                            id="v-pills-img1"
                            role="tabpanel"
                            aria-labelledby="v-pills-img1-tab"
                          >
                            <div
                              className="gallery-big-image shadow-lg"
                              style={{ border: "none" }}
                            >
                              <Carousel pause="hover">
                                {product.images &&
                                  product.images.map((image) => (
                                    <Carousel.Item key={image.public_id}>
                                      <img
                                        className="d-block w-100"
                                        src={image.url}
                                        alt={product.title}
                                      />
                                    </Carousel.Item>
                                  ))}
                              </Carousel>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="prod-details-content">
                    <ul className="product-review2 d-flex flex-row align-items-center mb-25">
                      <Rating
                        value={product.ratings}
                      >

                      </Rating>
                      <li>
                        <a href="#" className="review-no"></a> (
                        {product.numOfReviews} Đánh giá)
                      </li>
                    </ul>
                    <h3 className="eg-title1 mb-25">{product.name}</h3>
                    <h4 className="price-title border--bottom2 mb-15">
                      <span>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</span>
                    </h4>
                    <p className="para2 mb-15">{product.description}</p>
                    <div className="prod-quantity d-flex align-items-center justify-content-start mb-20">
                      <Stack direction="row" spacing={2}>
                        
                        <button
                            onClick={decreaseQty}
                            style={{ border: "none", background: "none" }}
                          >
                            <RemoveIcon/>
                          </button>
                      
                        <input
                          style={{width:"60px"}}
                          className="count p-1"
                          type="number"
                          value={quantity}
                          readOnly
                        />

                        <button
                            onClick={increaseQty}
                            style={{ border: "none", background: "none" }}
                        >
                            <AddIcon/>
                        </button>

                      </Stack>
                      
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Box sx={{ textAlign: 'center' }}> {/* Căn giữa icon */}
                            <CheckCircleOutlineIcon className="modal-icon" color="success" sx={{ fontSize: '100px'}} />
                          </Box>
                          <Box textAlign="center">
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                              Thành công
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                              Sản phẩm đã được thêm vào giỏ hàng.
                            </Typography>
                          </Box>  
                        </Box>
                      </Modal>

                      <Button
                        className="add-cart-btn"
                        onClick={addToCart}
                        disabled={product.stock === 0}
                      >
                          
                          <Box display="flex" flexDirection="row">
                            <AddShoppingCartOutlined/>
                            <Typography>
                              Thêm vào giỏ hàng
                            </Typography>
                          </Box>
                      </Button>
                    </div>
                    <ul className="prod-info">
                      <li>
                        <span>Stock:</span>
                        <b
                          className={
                            product.stock ? "text-success" : "text-danger"
                          }
                        >
                          {product.stock ? product.stock : "Out of stock"}
                        </b>
                      </li>
                      <li>
                        <span>Category:</span>
                        {product.category}
                      </li>
                      <li>
                        {user ? (
                          <button
                            id="review_btn"
                            type="button"
                            className="btn btn-primary mt-4"
                            data-toggle="modal"
                            data-target="#ratingModal"
                            onClick={setUserRatings}
                          >
                            Gửi đánh giá của bạn
                          </button>
                        ) : (
                          <div className="alert alert-danger mt-5" type="alert">
                            <strong> 
                              <Link to='login'>
                                Đăng nhập
                              </Link>
                            </strong> để đánh giá sản phẩm
                          </div>
                        )}
                      </li>
                    </ul>
                    <div className="row">
                      <div className="rating w-50">
                        <div
                          className="modal fade"
                          id="ratingModal"
                          tabIndex="-1"
                          role="dialog"
                          aria-labelledby="ratingModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="ratingModalLabel"
                                >
                                  Gửi đánh giá
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <ul className="stars">
                                  <li className="star">
                                    <i className="fa fa-star"></i>
                                  </li>
                                  <li className="star">
                                    <i className="fa fa-star"></i>
                                  </li>
                                  <li className="star">
                                    <i className="fa fa-star"></i>
                                  </li>
                                  <li className="star">
                                    <i className="fa fa-star"></i>
                                  </li>
                                  <li className="star">
                                    <i className="fa fa-star"></i>
                                  </li>
                                </ul>

                                <textarea
                                  name="review"
                                  id="review"
                                  className="form-control mt-3"
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                ></textarea>

                                <button
                                  className="btn my-3 float-right review-btn px-4 text-white"
                                  onClick={reviewHandler}
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  Gửi
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <RelatedProducts category={product.category} />

          {product.reviews && product.reviews.length > 0 && (
            <ListReviews reviews={product.reviews} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
