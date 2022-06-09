import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },

        description: {
            type: String,
        },

        price: {
            type: Number,
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true },
);

export default mongoose.model('Item', ItemSchema);
