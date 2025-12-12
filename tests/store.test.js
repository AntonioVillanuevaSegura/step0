import {getAll ,getById,create,updateById,deleteById} from '../store.js'
import {restoreDb,populateDb} from './utils.js'
import {whispers,inventedId,existingId} from './fixtures.js'
import {writeFileSync} from 'node:fs'
import { join } from 'node:path'
import {describe, it, expect, beforeEach, afterAll} from '@jest/globals' 
/*
 Jest, la librería de pruebas para JavaScript/Node.js
describe(): Agrupa tests relacionados en "suites" (bloques lógicos).
it() (o test()): Define un test individual (una prueba específica).
expect(): Crea aserciones (verifica que algo sea verdadero).
beforeEach(): Ejecuta código de setup antes de cada test (reinicia estado).
afterAll(): Ejecuta código de cleanup una vez después de todos los tests del archivo o suite.
 */

//describe testing con frameworks
//Test para store
describe ('store', () => { // Nivel 1: test Módulo completo store.js
	beforeEach ( () =>populateDb (whispers)) //Antes de cada test llenar whispers
	afterAll (restoreDb) //despues restaurar la db
	//Aqui van anidados todos los tests 
			
	//Test para getAll
	describe ('getAll' , () => {// Nivel 2
		
		it ("Retorna un array vacio si no hay datos",async () =>{
			restoreDb()
			const data = await getAll() //Recupera fichero local db.json
			//expect (data).toEqual (fixtures)
			 expect(data).toEqual([]) //data esta vacio es igual a []
		})
		
		it ("Retorna un array con un item cuando hay un item",async () => {
			const data = await getAll() //Recupera fichero local db.json
			expect(data).toEqual(whispers) //whispers en un JSON de test en fixtures.js
		})	
		
	})

	//Tests para getById
	describe ('getById', () =>{
		it ("Retorna undefined cuando no hay elemento con la id",async () =>{
			const item = await getById (inventedId) //busca la id inventedId = 12345
			expect (item).toBeUndefined() //indefinido 
		})	
		
		it ("retorna el item con la id",async () =>{
			const item = await getById (whispers[0].id)//busca la id:1 , {id:1 ,message :'test'},
			expect (item).toEqual (whispers[0]) //espera {id:1 ,message :'test'}
		})	
		
	})

	//Esperamos que el elemento sea devuelto incluyendo el id y anadido a la Db
	describe ('create', () =>{
		it ("Debe retornar el item creado ",async () =>{
			const newItem = {id:whispers.length+1,message: 'test 3'} //Crea un item con mensaje test 3
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

