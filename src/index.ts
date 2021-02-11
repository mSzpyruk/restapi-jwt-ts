import app from './config/app';

app.listen(app.get('port'));
console.log(`Listening on port:${app.get('port')}`);