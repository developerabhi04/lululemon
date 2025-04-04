import  { useState, useEffect } from "react";
import { Rating } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { submitReview, fetchReviews } from "../../redux/slices/reviewSlices";


const ReviewSection = ({ productId }) => {
    const dispatch = useDispatch();
    // Default reviews to an empty array if undefined
    const { reviews = [], loading, error } = useSelector((state) => state.review);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    useEffect(() => {
        if (productId) {
            dispatch(fetchReviews(productId));
        }
    }, [dispatch, productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0 || comment.trim() === "") {
            toast.error("Please provide both a rating and a comment.");
            return;
        }
        try {
            await dispatch(submitReview({ productId, rating, comment })).unwrap();
            toast.success("Review submitted successfully!");
            setRating(0);
            setComment("");
            dispatch(fetchReviews(productId));
        } catch (err) {
            toast.error(err);
        }
    };

    return (
        <div className="review-section">
            <h2>Leave Your Review</h2>
            <form className="review-form" onSubmit={handleSubmit}>
                <div className="rating-input">
                    <Rating value={rating} onChange={(e, newValue) => setRating(newValue)} />
                </div>
                <textarea
                    placeholder="Write your review here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit">Submit Review</button>
            </form>
            <div className="reviews-list">
                <h3>Customer Reviews</h3>
                {loading ? (
                    <p>Loading reviews...</p>
                ) : error ? (
                    <p className="error">{error}</p>
                ) : reviews.length === 0 ? (
                    <p>No reviews yet.</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review._id} className="review-item">
                            <div className="review-header">
                                <span className="review-user">{review.user.name}</span>
                                <Rating
                                    value={review.rating}
                                    readOnly
                                    precision={0.5}
                                    size="small"
                                />
                            </div>
                            <p className="review-comment">{review.comment}</p>
                            <span className="review-date">
                                {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ReviewSection;
