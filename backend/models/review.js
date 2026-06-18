const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

reviewSchema.statics.calculateAverageRating = async function(productId) {
    const obj = await this.aggregate([
        {
            $match: { product: productId }
        },
        {
            $group: {
                _id: '$product',
                averageRating: { $avg: '$rating' },
                numReviews: { $sum: 1 }
            }
        }
    ]);

    try {
        if (obj[0]) {
            await this.model('Product').findByIdAndUpdate(productId, {
                averageRating: obj[0].averageRating,
                numReviews: obj[0].numReviews
            });
        } else {
            await this.model('Product').findByIdAndUpdate(productId, {
                averageRating: 0,
                numReviews: 0
            });
        }
    } catch (err) {
        console.error(err);
    }
};

reviewSchema.post('save', function() {
    this.constructor.calculateAverageRating(this.product);
});

reviewSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        await doc.constructor.calculateAverageRating(doc.product);
    }
});

module.exports = mongoose.model("Review", reviewSchema);
