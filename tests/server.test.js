//Test funcionando a nivel de ficheros json locales 
/*
import supertest from 'supertest'
import {app} from '../server'
import {restoreDb,populateDb} from './utils'
import {whispers, inventedId,existingId} from './fixtures.js'
import { getById } from '../store.js';

describe ('Server', () =>{
	beforeEach (() => populateDb (whispers))
	afterAll (restoreDb)
	
	describe ("GET /api/v1/whisper", () => {

			it ("Debe retornar un array vacion cuando no hay datos",async () =>{
				await restoreDb ()  //Db vacia 
				const response = await supertest (app) .get ("/api/v1/whisper")
				expect (response.status).toBe(200)
				expect (response.body).toEqual ([])
			})
			
			it ("Debe retornar todos los whispers",async () =>{
				const response = await supertest (app).get ("/api/v1/whisper")
				expect (response.status).toBe (200)
				expect (response.body ).toEqual (whispers)
			})
	})
	
	describe ("GET /api/v1/whisper/:id", () =>{		
		it ("Debe retornar 404 cuando el whisper no existe",async () =>{
			const response = await supertest (app).get (`/api/v1/whisper/${inventedId}`)
			expect (response.status).toBe (404)
		})
		
		it ("Debe retornar los detalles del whisper",async () => {
			const response = await supertest (app).get (`/api/v1/whisper/${existingId}`)
			expect (response.status).toBe (200)
			expect (response.body).toEqual (whispers.find (w => w.id === existingId))			
		})
		
	})
	
	describe ("POST /api/v1/whisper ", () =>{

			it ("Debe retornar 400 cuando el cuerpo esta vacio",async () =>{
				const response = await supertest(app).post(`/api/v1/whisper`).send ({})
				expect (response.status).toBe (400)
			})			
			
			it ("Debe retornar 400 cuando el body es invalido",async () =>{
				const response = await supertest(app).post(`/api/v1/whisper`).send ({invented: "This is a new whisper"})
				expect (response.status).toBe (400)
			})	
			
			
		
			it ("Debe retornar 201 cuando se crea el whisper" ,async () => {//362
		
				const newWhisper = {id:whispers.length + 1, message:" This is a New whisper" }
				//POST 352
				const response = await supertest (app).post('/api/v1/whisper').send ({message:newWhisper.message})
				
				//Respuesta HTTP
				expect (response.status).toBe (201)
				expect (response.body).toEqual (newWhisper)// !!!!!!!!!!!!!! 
				
				//cambios en la Db
				const storedWhisper = await getById (newWhisper.id)
				expect (storedWhisper).toStrictEqual (newWhisper)
			})
			
	})

	describe ("PUT /api/v1/whisper/:id", () => {

		it ("Debe retornar 400 cuando el cuerpo esta vacio",async () =>{
			const response = await supertest (app).put (`/api/v1/whisper/${existingId}`).send({})
			expect (response.status).toBe(400)
		})
		
		it ("Debe retornar 400 cuando el cuerpo es invalido",async () =>{
			const response = await supertest (app).put (`/api/v1/whisper/${existingId}`).send({invented: "This is a new field"})
			expect (response.status).toBe(400)
		})	
		
		it ("Debe retornar 404 cuando el whisper no existe",async () =>{
			const response = await supertest (app).put (`/api/v1/whisper/${inventedId}`).send({message: "Whisper updated"})
			expect (response.status).toBe(404)
		})	
		
		it ("Debe retornar 200 cuando se actualiza whisper",async () =>{
			const response = await supertest (app).put (`/api/v1/whisper/${existingId}`).send({message: "Whisper updated"})
			expect (response.status).toBe(200)
			
			//La Db cambia
			const storedWhisper = await getById (existingId)
			expect (storedWhisper).toStrictEqual({id:existingId, message: "Whisper updated"})			
			
		})

		
		
	})
	
	describe ("DELETE /api/v1/whisper/:id", () =>{

		it ("Debe retornar 404 cuando el whisper no existe",async () => {//366
			const response = await supertest (app).delete (`/api/v1/whisper/${inventedId}`)
			expect (response.status).toBe(404)
		})
		
		it ("Debe retornar 200 cuando se borra whisper",async () => {//366
			const response = await supertest (app).delete (`/api/v1/whisper/${existingId}`)
			expect (response.status).toBe(200)
			
			//Cambios en Db			
			const storedWhisper = await getById(existingId)
			expect (storedWhisper).toBeUndefined()
			
		})			
	})
	
	
})
*/

//Test con la Base de Datos Mongo
import supertest from 'supertest'
import {app} from '../server'
import { getById } from '../store.js';
//import {restoreDb,populateDb} from './utils'
import {restoreDb,populateDb,getFixtures,ensureDbConnection,normalize,closeDbConnection} from './utils'
let whispers
let inventedId
let existingId

describe ('Server', () =>{
	beforeAll (ensureDbConnection)
	beforeEach (async () =>{
		await restoreDb
		await populateDb(whispers)
		const fixtures = await getFixtures	()
		whispers = fixtures.whispers
		inventedId = fixtures.inventedId
		existingId = fixtures.existingId
	})
	afterAll (closeDbConnection)
	
	
	describe ("GET /api/v1/whisper", () => {

			it ("Debe retornar un array vacion cuando no hay datos",async () =>{
				await restoreDb ()  //Db vacia 
				const response = await supertest (app) .get ("/api/v1/whisper")
				expect (response.status).toBe(200)
				expect (response.body).toEqual ([])
			})
			
			it ("Debe retornar todos los whispers",async () =>{
				const response = await supertest (app).get ("/api/v1/whisper")
				expect (response.status).toBe (200)
				expect (response.body ).toEqual (whispers)
			})
	})
	
	describe ("GET /api/v1/whisper/:id", () =>{		
		it ("Debe retornar 404 cuando el whisper no existe",async () =>{
			const response = await supertest (app).get (`/api/v1/whisper/${inventedId}`)
			expect (response.status).toBe (404)
		})
		
		it ("Debe retornar los detalles del whisper",async () => {
			const response = await supertest (app).get (`/api/v1/whisper/${existingId}`)
			expect (response.status).toBe (200)
			expect (response.body).toEqual (whispers.find (w => w.id === existingId))			
		})
		
	})
	
	describe ("POST /api/v1/whisper ", () =>{

			it ("Debe retornar 400 cuando el cuerpo esta vacio",async () =>{
				const response = await supertest(app).post(`/api/v1/whisper`).send ({})
				expect (response.status).toBe (400)
			})			
			
			it ("Debe retornar 400 cuando el body es invalido",async () =>{
				const response = await supertest(app).post(`/api/v1/whisper`).send ({invented: "This is a new whisper"})
				expect (response.status).toBe (400)
			})	
			
			
		
			it ("Debe retornar 201 cuando se crea el whisper" ,async () => {//400
		
				const newWhisper = {message:" This is a New whisper" }
				//POST 400
				const response = await supertest (app).post('/api/v1/whisper').send ({message:newWhisper.message})
				
				//Respuesta HTTP
				expect (response.status).toBe (201)
				expect (response.body.message).toEqual (newWhisper.message)
				
				//cambios en la Db
				const storedWhisper = await getById (response.body.id)
				expect (normalize (storedWhisper).message).toStrictEqual (newWhisper.message)
			})
			
	})

	describe ("PUT /api/v1/whisper/:id", () => {

		it ("Debe retornar 400 cuando el cuerpo esta vacio",async () =>{
			const response = await supertest (app).put (`/api/v1/whisper/${existingId}`).send({})
			expect (response.status).toBe(400)
		})
		
		it ("Debe retornar 400 cuando el cuerpo es invalido",async () =>{
			const response = await supertest (app).put (`/api/v1/whisper/${existingId}`).send({invented: "This is a new field"})
			expect (response.status).toBe(400)
		})	
		
		it ("Debe retornar 404 cuando el whisper no existe",async () =>{
			const response = await supertest (app).put (`/api/v1/whisper/${inventedId}`).send({message: "Whisper updated"})
			expect (response.status).toBe(404)
		})	
		
		it ("Debe retornar 200 cuando se actualiza whisper",async () =>{
			const response = await supertest (app).put (`/api/v1/whisper/${existingId}`).send({message: "Whisper updated"})
			expect (response.status).toBe(200)
			
			//La Db cambia
			const storedWhisper = await getById (existingId)
			expect (normalize (storedWhisper)).toStrictEqual({id:existingId, message: "Whisper updated"})			
			
		})

		
		
	})
	
	describe ("DELETE /api/v1/whisper/:id", () =>{

		it ("Debe retornar 404 cuando el whisper no existe",async () => {//366
			const response = await supertest (app).delete (`/api/v1/whisper/${inventedId}`)
			expect (response.status).toBe(404)
		})
		
		it ("Debe retornar 200 cuando se borra whisper",async () => {//366
			const response = await supertest (app).delete (`/api/v1/whisper/${existingId}`)
			expect (response.status).toBe(200)
			
			//Cambios en Db			
			const storedWhisper = await getById(existingId)
			expect (storedWhisper).toBe(null) //Repuesta de Mongo cuando no se encuentra antes era undefined
			
		})			
	})
	
	
})

