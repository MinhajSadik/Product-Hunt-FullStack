import { Rating } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
// } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../redux/features/productSlice";
import Loader from "../Layout/Loader/Loader";
import "./ProductDetails.css";
import ReviewCard from "./ReviewCard";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [quantity, setQuantity] = useState(1);

  const { productDetails, loading, error } = useSelector(
    (state) => state.products
  );

  // console.log("productDetails", productDetails.product);

  const options = {
    size: "large",
    value: productDetails?.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const addToCartHandler = () => {};
  const decreaseQuantity = () => {};
  const increaseQuantity = () => {};
  const submitReviewToggle = () => {};

  useEffect(() => {
    if (error) {
      alert.error(error);
      // dispatch(clearErrors());
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="ProductDetails">
            <div>
              <Carousel>
                {productDetails?.images &&
                  productDetails?.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div className="detailsBlock-1">
              <h2>{productDetails?.name}</h2>
              <p>Product # {productDetails?._id}</p>
            </div>
            <div className="detailsBlock-2">
              <Rating {...options} />
              <span className="detailsBlock-2-span">
                {" "}
                ({productDetails?.numberOfReviews} Reviews)
              </span>
            </div>
            <div className="detailsBlock-3">
              <h1>{`₹${productDetails?.price}`}</h1>
              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                  <button onClick={decreaseQuantity}>-</button>
                  <input readOnly type="number" value={quantity} />
                  <button onClick={increaseQuantity}>+</button>
                </div>
                <button
                  disabled={productDetails?.Stock < 1 ? true : false}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </div>
              <p>
                Status:
                <b
                  className={
                    productDetails.product?.Stock < 1
                      ? "redColor"
                      : "greenColor"
                  }
                >
                  {productDetails?.Stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>

              <div className="detailsBlock-4">
                Description : <p>{productDetails?.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>
          {/* <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={submitReviewToggle}
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className="submitDialog">
          <ReactStars
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            size="large"
          />

          <textarea
            className="submitDialogTextArea"
            cols="30"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitReviewToggle} color="secondary">
            Cancel
          </Button>
          <Button onClick={reviewSubmitHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog> */}

          {productDetails?.reviews && productDetails?.reviews[0] ? (
            <div className="reviews">
              {productDetails?.reviews &&
                productDetails?.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
