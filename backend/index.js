const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const students = require('./students');
const resources = require('./resources');

const { PORT = 3000 } = process.env;

const run = async () => {
  const app = new Koa();
  const router = new Router();

  
  // Allow cross-origin requests
  app.use(cors());
  
  app.use(bodyParser());
  app.use(serve('resources', { prefix: '/public' }));

/* Application */
  router.get('/resources', (ctx, next) => {
    ctx.body = { resources }
  });

  router.get('/students', (ctx, next) => {
    ctx.body = { students }
  });


  /**
   * POST body to save an assignment
   * The body should look like this
   * {
   *   "name": "My First Assignment",
   *   "date": "1617719851333", - This is a unix time stamp. You can use `new Date().getTime()` to get this
   *   "resources": [2,3],
   *   "students": ["5bd9e9fbecef8d003e003001", "5bd9e9fbecef8d003e003002"]
   * }
   */
  router.post('/assignment', (ctx) => {
    const messages = [];
    if (!ctx.request.body.name) messages.push("Please add an assignment name");
    if (!ctx.request.body.date) messages.push("Please add an assignment due date");
    if (!ctx.request.body.resources) messages.push("Please add a least 1 resource for the assignment");
    if (!ctx.request.body.students) messages.push("Please provide a list of students assigned to the task");

    if (messages.length > 0) {
      ctx.status = 400;
      ctx.body = { messages };
    } else {
      ctx.status = 201;
      ctx.body = { message: "Accepted assignment response successfully" };
    }
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  const server = app.listen(PORT, () => {
    const { address, port } = server.address();
    console.log(`Listening: http://${address}:${port}`);
  });
};

run().then(() => {
  console.log('Started server')
});
