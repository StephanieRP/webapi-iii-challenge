const express = require('express')
//import DB
const usersDB = require('../data/helpers/userDb');
const postsDB = require('../data/helpers/userDb');

const router = express.Router();

// Main Get request to get current data --> /
router.get('/', async (req, res) => {
    try {
      const user = await usersDB.get(req.query);
      res.status(200).json(user);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'The requested users could not be retrieved',
      });
    }
  });

   // Get request for user by id --> /:id
   router.get('/:id', async (req, res) => {
    try {
      const userID = await usersDB.getById(req.params.id);

      userID.length !== 0 ? res.status(200).json(userID) : res.status(404).json({ message: "The user with the specified ID could not be found." })

    } catch (error) {
      // log error to database
      res.status(500).json({
        message: "The user information could not be retrieved."
      });
    }
  });

  //checks user's name before POST and PUT requests
  const checkName = ((req,res,next) => {
    let { name } = req.body;
    if(name) {
      req.body.name = name[0].toUpperCase() + name.slice(1)
  } 
          next()
  
  })

  // Post request to add new user --> /
  router.post('/', checkName, async (req, res) => {
        try {
            const newUser = await usersDB.insert(req.body);
            newUser.name ?  res.status(201).json(newUser) : res.status(400).json({
              message: "Please provide name for the the new user."
            })
            console.log(req.body)
          } catch (error) {
            // log error to database
            res.status(500).json({
              message: "There was an error while saving the post to the database" 
            })
    }
  });


    // Get request for user's posts by id --> /:id
    router.get('/userspost/:id', async (req, res) => {
        try {
          const user = await usersDB.getUserPosts(req.params.id);
           user.length !== 0  ? res.status(200).json(user) : res.status(404).json({ message: "The post with the specified user ID does not exist." })
          
        } catch (error) {
          // log error to database
          res.status(500).json({
            message: "The post information for this user could not be retrieved."
          });
        }
      });


  // Delete request to delete user --> /:id
  router.delete('/:id', async (req, res) => {
    try {
      const user = await usersDB.remove(req.params.id);
    user > 0 ? res.status(204).end() : res.status(404).json({ message: "The user with the specified ID does not exist."  });
      
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The user could not be removed"
      });
    }
  })


  // Put request to edit user --> /:id
  router.put('/:id', checkName, async (req, res) => {
    try {
      const { id } = req.params
      const user = await usersDB.update(id, req.body);
      const { name } = req.body
      user ? res.status(200).json(req.body) : res.status(404).json({ message: "The user with the specified ID does not exist." });
      }
    catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "The user information could not be modified."
      });
    }
  });



    module.exports = router;
