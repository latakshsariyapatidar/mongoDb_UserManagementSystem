const express = require('express');
const app = express();
const path = require('path');

const user = require('./models/user');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('index');
});

app.post('/create', async (req, res) => {
    const {name, email, image} = req.body;

    if (!name || !email || !image) {
        return res.status(400).send('All fields are required');
    }
    else{
    const newUser = new user({
        name: name,
        email: email, 
        image: image
    });

    try{
        await newUser.save();
        res.redirect('/read');
    }
    catch(err) {
        console.error(err);
        res.status(500).send('Error saving user');
    }
    }



})

app.get('/delete/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        await user.findOneAndDelete({_id: userId});
        res.redirect('/read');
    }
    catch(err) {
        console.error(err);
        res.status(500).send('Error deleting user');
    }
})

app.get('/update/:id', async (req, res) => {
    const userId = req.params.id;
    const userData = await user.findOne({_id: userId});
   
    if (!userData) {
        return res.status(404).send('User not found');
    }
    res.render('update', {user: userData});
})

app.post('/updateUser/:id', async (req, res) => {
    const userId = req.params.id;
    const {name, email, image} = req.body;

    if (!name || !email || !image) {
        return res.status(400).send('All fields are required');
    }

    try {
        await user.findOneAndUpdate(
            {_id: userId},
            {name: name, email: email, image: image}
        );
        res.redirect('/read');
    }
    catch(err) {
        console.error(err);
        res.status(500).send('Error updating user');
    }
})

app.get('/read', async (req, res) => {
    const users = await user.find()
    res.render('read', {users: users});
} )

app.listen(3000);
