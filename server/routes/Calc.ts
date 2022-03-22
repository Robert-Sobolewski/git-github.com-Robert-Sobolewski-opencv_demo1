import express from 'express';


const calcRouter = express.Router();

// get 
calcRouter.get('/', async (req:express.Request, res:express.Response) => {

})

//post
calcRouter.post('/', (req:express.Request, res:express.Response) => {

    const a = req.body.a;
    const b = req.body.b;
    console.log(__dirname+'/add.py')
   // res.json({score:a+b})
    let spawn = require('child_process').spawn;
        let process = spawn('python',[__dirname+'/add.py',a, b]);
        
        process.stdout.on('data', (data:string)=>{
            console.log('result =',data.toString())
            res.json(data.toString().trimEnd())
        });
        process.on('close', (code:any)=>{
            console.log(`child process exited with code ${code}`)
        })
    // try {
    //      const a = req.body.a;
    //      const b = req.body.b;
    //      console.log('a,b =',a,b)
    //     // res.json({result: a+b})
    //     let spawn = require('child_process').spawn;
    //     let process = spawn('python',['/add.py',a, b]);
        
    //     process.stdout.on('data', (data:any)=>{
    //         console.log('result =',data)
    //         if(!data){
    //             console.log('data is undefined')
    //         }
    //         res.json({result: data})
    //     });
        
    // } catch (err) {
    //     console.error(err)
    //     res.status(400).json({message: err})
    // }
})

export default calcRouter;