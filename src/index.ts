import app from './config/app';
import './config/database';

app.listen(app.get('port'));
console.log(`Listening on port:${app.get('port')}`);
