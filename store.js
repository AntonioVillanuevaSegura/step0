import{
	Whisper
}from './database.js'

const getAll =Whisper.find() //carga todo el contenido


const getById = id => Whisper.findById({ _id:id}) 

//Crea un nuevo elemento en el JSON, asigna un ID autoincremental y lo guarda en el archivo.
const create = async (message) => {
	const whisper = new Whisper({message})
	await whisper.save()
	return whisper
}

//Actualiza el message de un elemento específico por su id en el JSON y guarda los cambios.
const updateById = async (id, message) => Whisper.findOneAndUpdate ({ _id:id}, {message},{new:false})


//Borra una id
const deleteById = async id =>Whisper.deleteOne({_id:id})

//Exporta todas estas funciones 
export {getAll,getById,create,updateById,deleteById}
