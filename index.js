const [{ Server: h1 }, x] = [require('http'), require('express')];

const Router = x.Router();
const PORT = 4321;
const { log } = console;
const hu = { 'Content-Type': 'text/html; charset=utf-8' };
const app = x();
const mw0 = (r, rs, n) => rs.status(200).set(hu) && n();
Router
  .route('/')
  .get(r => r.res.end('Привет мир!'));
app
  .use(mw0)
  .use(function workingSetter(req, res, next) {req.working = 'Работает, ура!'; next();})
  .use(x.static('.'))
  .use('/', Router)
  .get('/first', (req, res, next) => {
    req.app._router.stack.forEach(mw => console.log(mw.name))
    if (req.query.error == 'yes') return next();   
    res.send(req.working);
  })
  .use((req, res, next) => { req.errorMessage = 'Всё ещё нет'; next(); })
  .use(r => r.res.status(404).set(hu).send(r.errorMessage))
  .use((e, r, rs, n) => rs.status(500).set(hu).send(`Ошибка: ${e}`))
  /* .set('view engine', 'pug') */
  .set('x-powered-by', false);
module.exports = h1(app)
  .listen(process.env.PORT || PORT, () => log(process.pid));
