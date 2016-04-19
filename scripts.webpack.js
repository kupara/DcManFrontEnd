var context = require.context('./app/scripts', true, /\.jsx$/);
context.keys().forEach(context);
