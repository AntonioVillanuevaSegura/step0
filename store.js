import fs from 'node:fs/promises'
import path from 'node:path'
const filename =path.join (process.cwd(),'db.json')
const saveChanges = data => fs.writeFile (filename,JSON.stringify(data))
const readData = async () =>{
	const data =await fs.readFile (filename,'utf-8')
	return JSON.parse(data)
}
