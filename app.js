let app;
const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'x-test, Content-Type, Accept, Access-Control-Allow-Headers'
  };

export default function appSrc(express, bodyParser, createReadStream, crypto, http) 
{
    const app = express();
    const server = http.createServer(app);
    const fs = createReadStream;
    return app;
}


import('./index.js')
.then(module => {
    app = module.app;
    let hash = module.crypto.createHash('sha1');
    
    app
    .use((req, res, next) => res.status(200).set(CORS) && next())
    .use(module.bodyParser.urlencoded({extended: true}))
    .get(/login/, (req, res) => {res.send('dudvik')})
    .get(/code/, (req, res) => module.createReadStream(import.meta.url.substring(7)).pipe(res))
    .get('/sha1/:input/', r => {
        hash.update(r.params.input);
        r.res.send(hash.digest('hex'))})
    .get('/req/', (req, res) => { 
        let path = req.query.addr;
        module.http.get(path, (resp) => {
            let rawData = '';
            const {statusCode} = resp;
            resp.setEncoding('utf8');
            resp.on('data', (chunk) => { rawData += chunk; });
            resp.on('end', () => {res.send(rawData);})
            })
        
        })
    .post('/req', r => {
        let path = r.body.addr;
        module.http.get(path, (resp) => {
            let rawData = '';
            const {statusCode} = resp;
            resp.setEncoding('utf8');
            resp.on('data', (chunk) => { rawData += chunk; });
            resp.on('end', () => {r.res.send(rawData);})
            })

    })

    .all(/./, (req, res) => {res.send('dudvik')});
})
