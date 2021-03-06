import express from 'express';
import ValidationMiddleware from '../middleware/validation';
import db from '../models/playerService';

const router = express.Router();

router.put('/:id', (req, res) => {

    db.updateBook(req, res)
})

router.post('/', (req, res) => {
    db.createBook(req, res);
});



// To add: a put request to update a book.
//

router.get('/', (req, res) => {
    db.readBooks(req, res);
})

router.get('/:id', [ValidationMiddleware.validJWTNeeded, (req, res) => {

    db.readBook(req, res);

}])

router.delete('/:id', (req, res) => {

    db.deleteBook(req, res);

})



export default router;