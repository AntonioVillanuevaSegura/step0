import {getAll ,getById,create,updateById,deleteById} from '../store.js'
import {restoreDb,populateDb} from './utils.js'
import {whispers,inventedId,existingId} from './fixtures.js'
import {writeFileSync} from 'node:fs'
import { join } from 'node:path'
import {describe, it, expect, beforeEach, afterAll} from '@jest/globals' 

//const dbPath = join (process.cwd(),'db.json')

//const restoreDb = () =>writeFileSync (dbPath,JSON.stringify ([]))
//const populateDb = (data) =>writeFileSync (dbPath,JSON.stringify (data))

//Fixtures conjunto de datos predefinidos y fijos, para probar la Db
//const whispers = [ {id:1,message:'test'} ,{id:2,message:'hello world'}]

//const inventedId = 12345

//const existingId = whispers [0].id

//describe testing con frameworks
//Test para store
describe ('store', () => { // Nivel 1: Módulo completo
	beforeEach ( () =>populateDb (whispers))
	afterAll (restoreDb)
	//Aqui van anidados todos los tests 
			
	//Test para getAll
	describe ('getAll' , () => {// Nivel 2
		
		it ("Retorna un array vacio si no hay datos",async () =>{
			restoreDb()
			const data = await getAll()
			//expect (data).toEqual (fixtures)
			 expect(data).toEqual([])  // Cambia fixtures por []
		})
		
		it ("Retorna un array con un item cuando hay un item",async () => {
			const data = await getAll()
			expect(data).toEqual(whispers)
		})	
		
	})

	//Tests para getById
	describe ('getById', () =>{
		it ("Retorna undefined cuando no hay elemento con la id",async () =>{
			const item = await getById (inventedId)
			expect (item).toBeUndefined()
		})	
		
		it ("retorna el item con la id",async () =>{
			const item = await getById (whispers[0].id)
			expect (item).toEqual (whispers[0])
		})	
		
	})

	//Esperamos que el elemento sea devuelto incluyendo el id y anadido a la Db
	describe ('create', () =>{
		it ("Debe retornar el item creado ",async () =>{
			const newItem = {id:whispers.length+1,message: 'test 3'}
			const item = await create (newItem.message)
			expect (item).toEqual (newItem)
			
		})		
		
		it ("Debe anadir el item a la Db ",async () =>{
			const newItem = {id:whispers.length+1,message: 'test 3b'}
			const {id} = await create (newItem.message)
			//const item = await create (newItem.message)
			const item = await getById(id)  
			expect (item).toEqual (newItem)
			
		})		
		
		
		
	})

	describe ('updateById',() =>{
		
		it ("Debe retornar undefined cuando no hay item para esa id ",async () =>{
			const item = await updateById (inventedId)
			expect (item).toBeUndefined ()
		})
		
	
		it ("No debe retornar el item actualizado ",async () =>{
		
			const updatedItem = {id:existingId,message:'updated'}
			const item= await updateById (updatedItem.id,updatedItem.message)
			expect (item).toBeUndefined ()
		})				
	
		it ("Debe actualizar el item. en la Db ",async () =>{
		
			const updatedItem = {id:existingId,message:'updated'} //
			//const updatedItem = {id:existingId,message:'test'} //ok 
			await updateById (updatedItem.id , updatedItem.message)
			const item =await getById (existingId)
			expect(item).toEqual(updatedItem)
			
		})	
	
		
	})

	//Ultimos tests deleteById
	describe ('deleteById', () =>{
		
		it ("Debe retornar indefinido cuando no existe un item. con dicha id ",async () =>{
			const item =await deleteById (inventedId)
			expect (item).toBeUndefined()
		})		
		
		it ("No debe retornar el item. borrado",async () =>{
			const item =await deleteById (existingId)
			expect (item).toBeUndefined()
		})		
		
		it ("Debe borrar el item. de la Db",async () =>{
			await deleteById (existingId)
			const items = await getAll()
			expect (items).toEqual (whispers.filter (item => item.id !== existingId))
		})		
		
	})


})

