const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    addReview,
    getProductReviews,
    updateReview,
    deleteReview
} = require('../controllers/reviewController');

router.post('/:productId', addReview);
router.get('/:productId', getProductReviews);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

module.exports = router;
