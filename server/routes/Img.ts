
import express from 'express';


const imgRouter = express.Router();

imgRouter.post('/', (req: express.Request, res: express.Response) => {
    try {
        const img =req.body.img;
        if(img!=null) {
            console.log('img router got image base64')
            res.json(img)
        }

        let spawn = require('child_process').spawn;
        let process = spawn('python',[__dirname+'/img.py',img]);
        process.stdout.on('data', (data:string)=>{
            console.log('result =',data.toString())
            //res.json(data)
        });
        process.on('close', (code:any)=>{
            console.log(`child process exited with code ${code}`)
        })




    } catch (error) {
        res.status(400).json({message: error})
    }
});


export default imgRouter;