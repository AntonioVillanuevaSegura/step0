//FICHERO CRUD Create Read Update Delete operaciones de base de datos en Fichero local db.json
import fs from 'node:fs/promises'
import path from 'node:path'
const filename =path.join (process.cwd(),'db.json') //process.cwd() devuelve el directorio actual join une los dos
//data => crea una funcion flecha
//JSON.stringify(data) convierte objeto JavaScroipt en Jason 
//fs.writeFile(filename, ...) escribe en filename la cadena
const saveChanges = data => fs.writeFile (filename,JSON.stringify(data))

//Lee el fichero en filename db.json y retorna el JSON
const readData = async () =>{
	const data =await fs.readFile (filename,'utf-8')
	return JSON.parse(data)
}

const getAll =readData //carga todo el contenido del archivo db.json

//Esta funcion busca un item por una id en el JSON leido y retorna el objeto
//Es asíncrona porque depende de readData(), así que se usa  getById(123)
//ejemplo de uso ,const usuario = await getById(2);  // Retorna {id:2, nombre:'Ana'} o undefined
const getById = async (id) => {
	const data = await readData() //carga todo el contenido del archivo db.json
	return data.find(item => item.id === id) //recorre el array y devuelve el primer objeto donde item.id coincida con el parámetro id recibido
}

//Crea un nuevo elemento en el JSON, asigna un ID autoincremental y lo guarda en el archivo.
const create = async (message) => {
	const data =await readData() //lee el filename data es el JSON
	const newItem = {message,id:data.length+1} // crea un nuevo objeto usando el parámetro message (destructuring implícito) y calcula el ID como la longitud del array +1 (autoincremental).
	await saveChanges (data.concat([newItem])) //concatena el nuevo elemento al array y sobrescribe el archivo completo con los datos actualizados.
	return newItem //devuelve el nuevo item
}

//Actualiza el message de un elemento específico por su id en el JSON y guarda los cambios.
const updateById = async (id, message) => {
	const data = await readData () //lee el filename data es el JSON
	const newData = data.map (current => { //recorre todos los elementos creando un nuevo array, es una operación sincrónica
		
		//Si current.id === id, retorna una copia del objeto con ...current (spread operator) pero sobrescribiendo solo la propiedad message
		if (current.id === id){ //Ha encontrado la id
			return { ... current, message} //devuelve current pero sobreescribe el mensaje 
		}
		return current
	})
	await saveChanges (newData) //sobrescribe el archivo con el array actualizado , await para la ejecución de la función updateById hasta que termine la escritura en disco
}

//Borra una id
const deleteById = async id =>{
	const data = await readData()
	await saveChanges(data.filter(current => current.id !==id))
}

//Exporta todas estas funciones 
export {getAll,getById,create,updateById,deleteById}
