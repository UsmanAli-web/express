const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const users = [
{ id: 1, name: 'Muhammad' },
{ id: 2, name: 'Ali' }
];



app.get('/users', (req, res) => {
  res.send(users);
    
});

app.post('/users', (req, res) => {
const newUser = req.body;
  users.push(newUser);
  res.status(201).send(newUser);
});

app.patch('/users/:id', (req, res) => {
  const user = users.find(u => u.id === 2);

    const id = parseInt(req.params.id);
  const { name } = req.body;


  if (!user) {
    return res.status(404).send({ error: 'User not found' }); 
  }

  if (name) {
    user.name = name; 
  }

  res.send(user); 
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).send({ error: 'User not found' });
  }
  users.splice(index, 1);
  res.send({ message: 'User deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});






