const mongoose = require('mongoose');

const uuidSchema  = new mongoose.Schema({
    uuid: {
        type: String,
      
    },
    date: {
        type: Date,

    },
    sslready: {
        type: Boolean,
        default : false

    },
    
},{
    timestamps: true
})

uuidSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
uuidSchema.set('toJSON', {
    virtuals: true
});

const field = new mongoose.model("uuid",uuidSchema);
module.exports = field;
