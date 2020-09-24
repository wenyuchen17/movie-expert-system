const router = require(`express`).Router();
const User = require(`../models/user_model`);
const TMDb = require(`../TMDb/tmdb`);


//get all users
router.route(`/`).get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error: ${err}`));
});


//create a new user
router.route(`/create`).post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const year = Number(req.body.year);
    const runtime = Number(req.body.runtime);
    const genres = req.body.genres;
    const adult = Boolean(req.body.adult);
    const engmntLevel = Number(req.body.engmntLevel);
    const favorites = req.body.favorites;

    const newUser = new User({
        username,
        password,
        year,
        runtime,
        genres,
        adult,
        engmntLevel,
        favorites
    });

    newUser.save()
        .then(() => res.json(`User added!`))
        .catch(err => res.status(400).json(`Error: ${err}`));
});


//get a specific user for updating
router.route(`/edit/:id`).get((req, res) => {
    User.findById((req.params.id))
        .then(user => res.json(user))
        .catch(err => res.status(400).json(`Error: ${err}`));
});


//delete user
router.route(`/delete/:id`).delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json(`User deleted!`))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

//update user
router.route(`/edit/:id`).post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;
            user.password = req.body.password;
            user.year = Number(req.body.year);
            user.runtime = Number(req.body.runtime);
            user.genres = req.body.genres;
            user.adult = Boolean(req.body.adult);
            user.engmntLevel = Number(req.body.engmntLevel);

            user.save()
                .then(() => res.json(`User updated!`))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

//get the current user for the profile section
router.route(`/get/profile`).get((req, res) => {
    User.find()
        .then(users => {
            const currentUser = users.find(user => {
                return user.username === req.query.username && user.password === req.query.password;
            });

            res.json(currentUser)
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

//remove the selected movie from the current user's favorite list
router.route(`/edit/favorite/:id`).post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            for (let i = 0; i < user.favorites.length; i++) {
                if (user.favorites[i].id === req.body.id) {
                    user.favorites.splice(i, 1);
                    break;
                }
            }
            
            user.save()
                .then(() => res.json(user))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

//get movie suggestions for the current user
router.route(`/get/current`).get((req, res) => {
    User.find()
        .then(users => {
            const currentUser = users.find(user => user.username === req.query.username);
            
            if (currentUser === undefined)
                res.json(``);
            else {
                TMDb.sendMovies(res, currentUser);
            }
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

//get popular movies for the popular section 
router.route(`/get/trending`).get((req, res) => TMDb.sendTrendingMovies(res) );

//add movies to the current user's favorite list
router.route(`/add/favorite`).post((req, res) => {
    User.findById(req.body.params.currentUser._id)
    .then(user => {
        let exists = false;
        for (let i = 0; i < user.favorites.length; i++) {
            if (user.favorites[i].id === req.body.params.movie.id) {
                exists = true;
                break;
            }
        }

        if (exists)
            res.json(`Already added!`)
        else {
            user.favorites.push(req.body.params.movie);
            user.save()
                .then(() => res.json(`Movie added to favorites!`))
                .catch(err => res.status(400).json(`Error: ${err}`));
        }
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;