import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { getProductReviews, addReview, updateReview, deleteReview } from '../api/reviewApi';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [editReviewId, setEditReviewId] = useState(null);

    const fetchProductData = async () => {
        try {
            const productRes = await api.get(`/products/${id}`);
            setProduct(productRes.data);

            const reviewsRes = await getProductReviews(id);
            setReviews(reviewsRes.data);
        } catch (err) {
            console.error('Failed to fetch product details', err);
            toast.error('Failed to load product details.');
        }
    };

    useEffect(() => {
        fetchProductData();
    }, [id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Please login to submit a review');
            navigate('/login');
            return;
        }

        try {
            if (editReviewId) {
                await updateReview(editReviewId, rating, comment);
                toast.success('Review updated successfully!');
            } else {
                await addReview(id, rating, comment);
                toast.success('Review added successfully!');
            }
            setRating(5);
            setComment('');
            setEditReviewId(null);
            fetchProductData();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to submit review');
        }
    };

    const handleEditClick = (review) => {
        setRating(review.rating);
        setComment(review.comment);
        setEditReviewId(review._id);
    };

    const handleDeleteClick = async (reviewId) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;
        try {
            await deleteReview(reviewId);
            toast.success('Review deleted successfully!');
            fetchProductData();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to delete review');
        }
    };

    if (!product) return <div>Loading...</div>;

    const userHasReviewed = reviews.some(r => r.user?._id === user?.id);

    return (
        <div style={{ padding: '20px' }}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p><strong>Price:</strong> ₹{product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>
            
            <p><strong>Average Rating:</strong> {product.averageRating ? product.averageRating.toFixed(1) : 0} / 5 ({product.numReviews || 0} reviews)</p>
            <hr />
            
            <h2>Reviews</h2>
            {reviews.length === 0 ? (
                <p>No reviews yet.</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {reviews.map(review => (
                        <li key={review._id} style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '10px' }}>
                            <p><strong>{review.user?.name}</strong> - {review.rating}/5</p>
                            <p>{review.comment}</p>
                            {user?.id === review.user?._id && (
                                <div>
                                    <button onClick={() => handleEditClick(review)} style={{ marginRight: '10px' }}>Edit</button>
                                    <button onClick={() => handleDeleteClick(review._id)}>Delete</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {user && (!userHasReviewed || editReviewId) ? (
                <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                    <h3>{editReviewId ? 'Edit Your Review' : 'Write a Review'}</h3>
                    <form onSubmit={handleReviewSubmit}>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Rating: </label>
                            <select value={rating} onChange={e => setRating(Number(e.target.value))}>
                                {[1, 2, 3, 4, 5].map(num => (
                                    <option key={num} value={num}>{num} Stars</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Comment: </label><br />
                            <textarea 
                                value={comment} 
                                onChange={e => setComment(e.target.value)} 
                                required 
                                rows="4" 
                                style={{ width: '100%', maxWidth: '400px' }}
                            />
                        </div>
                        <button type="submit">{editReviewId ? 'Update Review' : 'Submit Review'}</button>
                        {editReviewId && (
                            <button 
                                type="button" 
                                onClick={() => { setEditReviewId(null); setRating(5); setComment(''); }}
                                style={{ marginLeft: '10px' }}
                            >
                                Cancel
                            </button>
                        )}
                    </form>
                </div>
            ) : user ? (
                <p style={{ marginTop: '20px' }}>You have already reviewed this product.</p>
            ) : (
                <p style={{ marginTop: '20px' }}>Please <a href="/login">login</a> to write a review.</p>
            )}
        </div>
    );
};

export default ProductDetails;
