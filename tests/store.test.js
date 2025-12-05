import {getAll ,getById,create,updateById,deleteById} from '../store.js'
import {writeFileSync} from 'node:fs'
import { join } from 'node:path'
const dbPath = join (process.cwd(),'db.json')

const restoreDb = () =>writeFileSync (dbPath,JSON.stringify ([]))
const populateDb = (data) =>writeFileSync (dbPath,JSON.stringify (data))

//Fixtures conjunto de datos predefinidos y fijos, para probar la Db
const fixtures = [ {id:1,message:'test'} ,{id:2,message:'hello world'}]

const inventedId = 12345

const existingId = fixtures [0].id

//describe testing con frameworks
//Test para store
describe ('store', () => {
	beforeEach ( () =>populateDb (fixtures))
	afterAll (restoreDb)
	//Aqui van los Tests .... 
}

//Test para getAll
describe ('getAll' , () => {
	
	it ("Retorna un array vacio si no hay datos",async () =>{
		restoreDb()
		const data = await getAll()
		expect (data).toEqual ([])
		
	})
	
	it ("Retorna un array con un item cuando hay un item",async () =>{
		const data = await getAll()
		expect (data).toEqual ([])
	})	
	
})

//Tests para getById
describe ('getById', () =>{
	it ("Retorna undefined cuando no hay elemento con la id",async () =>{
		const item = await getById (invented)
		expect (item).toBeUndefined()
	})	
	
	it ("retorna el item con la id",async () =>{
		const item = await getById (fixtures[0].id)
		expect (item).toEqual (fixtures[0])
	})	
	
})

describe ('create', () =>{
	it ("Debe retornar el item creado ",async () =>{
		const newItem = {id:fixtures.length+1,message: 'test 3'}
		const item = await create (newItem.message)
		expect (item).toEqual (newItem)
		
	})		
	
	it ("Debe anadir el item a la Db ",async () =>{
		const newItem = {id:fixtures.length+1,message: 'test 3'}
		const item = await create (newItem.message)
		expect (item).toEqual (newItem)
		
	})		
	
	
	
})
