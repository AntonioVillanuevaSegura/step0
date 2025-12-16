
import mongoose from 'mongoose'
mongoose.set ('toJSON', {
	virtuals:true,
	transform: (doc,converted) =>{
		delete converted._id
		delete converted.__v
	}

/*	
	{
		"_id":"5dff 03d3 218b 9142 5b9d 6fab"
		"message" : "I love MongoDB!",
		"_v":0
	}
	
	{
		"_id":"5dff 03d3 218b 9142 5b9d 6fab"
		"message" : "I love MongoDB!",
	}	
	*/
})

// 1 Esquema estructura a guardar en la base de datos
const whisperSchema = new mongoose.Schema ({
		message:String
})

//2 Modelo , una clase para interactuar con la base de datos
const Whisper = mongoose.model ('Whisper',whisperSchema)

export  {
	Whisper
}
