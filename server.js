import express from 'express'
import bodyParser from 'body-parser'
const app=express()
app.use (express.static ('public'))
app.use (bodyParser.json())
app.get ('/api/v1/whisper', (req,res) => {
	res.json([])
})

app.get ('/api/v1/whisper/:id',(req,res)=>{
	const id=ParseInt (req.params.id)
	res.json({id})
})

app.post ('api/v1/whisper',(req,res) =>{
	res.status (201).json(req.body)
})

app.put ('api/v1/whisper/:id',(req,res) => {
	//const id=parseInt (req.params.id)
	res.sendStatus(200)
})


export {app}
