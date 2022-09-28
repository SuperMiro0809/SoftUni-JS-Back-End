const express = require('express');
const config = require('./config/config.json');
const app = express();

require('./config/express')(app);
require('./routing/routes')(app);

app.listen(config.port, () => {
    console.log(`App is listening at port ${config.port}`)
})