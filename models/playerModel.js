import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';



const Schema = mongoose.Schema;


const PlayerSchema = new Schema({
        // title: { type: String, required: true },
        // starRating: { type: Number, min: 0, max: 5 },
        // summary: { type: String, required: true },
        // keywords: [String],
        // isbn: { type: String, required: true, index: { unique: true } },
        isbn: { type: String, required: true, index: { unique: true } },
        name: { type: String, required: true },
        last: { type: String, required: true },
        age: { type: Number, required: true }, // age of player
        team: { type: String, required: true },
        position: { type: String, required: true },
        wage: { type: Number, required: true },
        skill: { type: Number, min: 1, max: 5, required: true },
        weekFoot: { type: String, required: true },



    }, { toJSON: { virtuals: true } }) // include virtuals when document is converted to JSON


// this creates a get property uri which can be used but does not
// get stpred om the database

PlayerSchema.virtual('uri').get(function() {
    return `/players/${this._id}`;
});

PlayerSchema.plugin(uniqueValidator);

let Player = mongoose.model('Player', PlayerSchema);


export { Player };