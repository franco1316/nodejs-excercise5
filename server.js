const { Server } = require('socket.io');

const { app } = require("./app");

const { initModels } = require("./models/initModels");

const { db } = require("./utils/database");

db.authenticate()
  .then(() => console.log("Database authenticated"))
  .catch((err) => console.log(err));

initModels();

db.sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4004;

const server = app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', socket => {
  socket.on('new-post', newPostData => {
    socket.broadcast.emit('render-new-post', newPostData);
  });
});