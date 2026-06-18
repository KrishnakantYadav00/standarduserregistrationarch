import api from "./axios";

export const addReview = (productId, rating, comment) => {
    return api.post(
        `/reviews/${productId}`,
        { rating, comment }
    );
};

export const getProductReviews = (productId) => {
    return api.get(
        `/reviews/${productId}`
    );
};

export const updateReview = (reviewId, rating, comment) => {
    return api.put(
        `/reviews/${reviewId}`,
        { rating, comment }
    );
};

export const deleteReview = (reviewId) => {
    return api.delete(
        `/reviews/${reviewId}`
    );
};
