import app from './config/server'
import Logger from './config/logger'



app.listen(3333, () => {
    Logger.debug(`Server is up and running @ http://localhost:3333}`);
 
})