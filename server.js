const express = require('express');
const shortid = require('shortid');
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.json())

let users =[
    {
        id: "",
        name: "Janice",
        bio: " not Chandler's girlfriend"
    }
];

server.get('/', (req, res) => {
    res.send( "Server is running")
});


server.post('/api/users', (req, res) => {
  const userInfo = req.body;

  if(userInfo.name && userInfo.bio) {
      users.push({
          id:shortid.generate(),
          name: userInfo.name,
          bio: userInfo.bio
      })
      return res.status(201).json(users)
  }
  else{
      return res.status(400).json({errorMessage: "Please provide name and bio for the user."})

  }

});

server.get('/api/users', (req, res) => {
    res.status(200).json(users)
});

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id
    const user = users.find(user => user.id === id)
    if(user)
        res.status(200).json(user)
    else
        return res.status(404).json({errorMessage: "The user with the specified ID does not exist."})
});

server.delete('/api/users/:id',(req, res) => {
    const id = req.params.id
    const user = users.find(user => user.id === id)
    if(user){
        users = users.filter(currentUser => currentUser.id !== user.id)
        res.status(200).json(users)
    }
    else {
        res.status(404).json({errorMessage: "The user with the specified ID does not exist."})
    }

})

server.patch('api/users/:id',(req, res) => {
    const id = req.params.id;
    const user = users.find(user => user.id === id)

    if(!user)
        return res.status(404).json({ message: "The user with the specified ID does not exist." })
    if(req.body.name)
        user.name = req.body.name
    if(req.body.bio)
        user.bio = req.body.bio
    return res.status(200).json(user)
})

server.listen(8000, () => console.log("API is running on port 8000"))