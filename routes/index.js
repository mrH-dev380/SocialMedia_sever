const authRouter = require('./auth')
const userRouter = require('./user')
const postRouter = require('./post')
const uploadRouter = require('./upload')

function route(app) {
  app.use('/auth', authRouter);
  app.use('/user', userRouter);
  app.use('/post', postRouter)
  app.use('/upload', uploadRouter);
}

module.exports = route;