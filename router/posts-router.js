const express = require('express')
//import DB
const postsDB = require('../data/helpers/postDb');
const userDB = require('../data/helpers/userDb');

const router = express.Router();

// Main Get request to get current data --> /
router.get('/', async (req, res) => {
    try {
      const post = await postsDB.get(req.query);
      res.status(200).json(post);
      console.log(userDB)
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'The requested users could not be retrieved',
      });
    }
  });

   // Get request for posts by id --> /:id
//    router.get('/:id', async (req, res) => {
//     try {
//       const postID = await postsDB.getById(req.params.id);

//       postID ? res.status(200).json(userID) : res.status(404).json({ message: "The post with the specified ID does not exist." })
//         console.log(userID)
//     } catch (error) {
//       // log error to database
//       res.status(500).json({
//         message: "The post information for this user could not be retrieved."
//       });
//     }
//   });

    // Get request for user's posts by id --> /:id
    router.get('/user:id/', async (req, res) => {
        try {
          const  post  = await postsDB.getById(req.params.id);
          const user = await get.getUserPosts(req.params.id);
    
          
        } catch (error) {
          // log error to database
          res.status(500).json({
            message: "The post information for this user could not be retrieved."
          });
        }
      });
    

  // Post request to add new posts --> /
  router.post('/', async (req, res) => {
    const { text, user_id } = req.body;
        try {
            const newUser = await postsDB.insert(req.body);
            text && user_id ?  res.status(201).json(newUser) : res.status(400).json({
              message: "Please provide text and id for the the new post."
            })
            console.log(req.body)
          } catch (error) {
            // log error to database
            res.status(500).json({
              message: "There was an error while saving the post to the database" 
            })
    }
  });


  // Delete request to delete posts --> /:id
  router.delete('/:id', async (req, res) => {
    try {
      const post = await postsDB.remove(req.params.id);
    post > 0 ? res.status(204).end() : res.status(404).json({ message: "The post with the specified ID does not exist."  });
      
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The post could not be removed"
      });
    }
  })


  // Put request to edit posts --> /:id
  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params
      const post = await postsDB.update(id, req.body);
      post ? res.status(200).json(req.body) : res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "The post information could not be modified."
      });
    }
  });


module.exports = router;
