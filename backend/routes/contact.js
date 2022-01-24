const router = require('express').Router();
const fs = require("fs");
let Contact = require('../models/contact.model');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../src/assets/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});


const fileFilter = (req, res, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
        cb(null, true);
    else
        cb(null, false)
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1024
    }
});


router.route('/').get((req, res) => {
    Contact.find()
        .then(contact => res.json(contact))
        .catch(err => res.status(400).json('Error:' + err));
});


//get contacts by contact Id
router.route('/:id').get((req, res) => {
    Contact.find()
        .where("contactId").equals(req.params.id)
        .sort({ name: "asc" })
        .then(contact => res.json(contact))
        .catch(err => res.status(400).json('Error:' + err));
});


//create contacts
// router.route('/add').post((upload.single('image')), (req, res) => {
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;
    const email = req.body.email;
    const contactId = req.body.contactId;
    // var img = fs.readFileSync(req.file.path);
    // var encode_img = img.toString('base64');

    // console.log(req.file)
    const newContact = new Contact({
        name: name,
        phone: phone,
        // image: {
        //     contentType: 'image/png',
        //     image: new Buffer(encode_img, 'base64')
        // },
        address: address,
        email: email,
        contactId: contactId
    });

    newContact.save()
        .then(() => {
            res.json("Contact Added");
            // res.contentType(image.contentType);
            // res.send(image.image);
            console.log(data)
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});

//get contacts
router.route('/edit/:id').get((req, res) => {
    Contact.findById(req.params.id)
        .then((contact) => res.json(contact))
        .catch((err) => res.status(400).json('Error: ' + err));

});


//delete contacts
router.route('/delete/:id').delete((req, res) => {
    Contact.findByIdAndDelete(req.params.id)
        .then(() => res.json("Contact Deleted"))
        .catch((err) => res.status(400).json('Error: ' + err));

});



//Update contact data
router.route('/update/:id').post((req, res) => {
    Contact.findById(req.params.id)
        .then((contact) => {
            contact.name = req.body.name;
            contact.phone = req.body.phone;
            contact.address = req.body.address;
            contact.email = req.body.email;
            contact.favourite = req.body.favourite;

            contact.save()
                .then(() => res.json("Contact Updated"))
                .catch((err) => res.status(400).json('Error: ' + err));
        });
});


//get contacts by Id
router.route('/get/:id').get((req, res) => {
    Contact.findById(req.params.id)
        .then((contact) => res.json(contact))
        .catch((err) => res.status(400).json('Error:' + err));
});

//get contacts by favourites equals to true
router.route('/favourites/:id').get((req, res) => {
    Contact.find()
        .where("favourite").equals("true")
        .sort({ name: "asc" })
        .then(contact => res.json(contact))
        .catch(err => res.status(400).json('Error:' + err));
});

//toggle favourites 
router.route('/favourites/:id/:fav').get((req, res) => {
    Contact.findById(req.params.id)
        .then((contact) => {
            const fav = req.params.fav
            if (fav == "true") {
                contact.favourite = false
            }
            else {
                contact.favourite = true
            }
            contact.save()
                .then(() => res.json(contact.favourite))
                .catch((err) => res.status(400).json('Error: ' + err));
        })
});


module.exports = router


