const bunyan = require('bunyan');
const path = require('path');

// 5 Levels of severity - 1.Debug, 2.info, 3.warn, 4.error, 5.fatal

const logger = bunyan.createLogger(
    {
        name : 'logger-instance',
        streams : 
                [  
                    // This means that log messages will be displayed in the terminal or console where the Node.js application is running.
                    {level : 'info', stream : process.stdout},
                    // specifies the file path where log messages will be written,log messages will be stored in a file named "app.log"
                    // located within a directory named "logs".
                    {level : 'info', path : path.join('logs','app.log')} 
                ]
    }
);

module.exports = logger;
