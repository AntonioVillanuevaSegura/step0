
import supertest from 'supertest'
import {app} from '../server'
import {restoreDb,populateDb} from './utils'
import {whispers, inventedId,existingId} from './fixtures.js'

import {getByid} from '../store'

describe ('Server', () =>{
	beforeEach (() => populateDb (whispers))
	afterAll (restoreDb)
	
	describe ("GET /api/v1/whisper", () => {
			/*
			it.todo ("Debe retornar un array vacio cuando no hay datos")
			it.todo ("Debe retornar todo el whisper")
			*/
			it ("Debe retornar un array vacion cuando no hay datos",async () =>{
				await restoreDb ()  //Db vacia 
				const response = await supertest (app) .get ("/api/v1/whisper")
				expect (response.status).toBe(200)
				expect (response.body).toEqual ([])
			})
			
			if ("Debe retornar todos los whispers",async () =>{
				const response = await supertest (app).get ("/api/v1/whisper")
				expect (response.status).toBe (200)
				expect (response.body ).toEqual (whispers)
			})
	})
	
	describe ("GET /api/v1/whisper/:id", () =>{
		/*
			it.todo ("Debe retornar 404 cuando el whisper no existe")
			it.todo ("Debe retornar los detalles del whisper")
		*/
		
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
			/*
			it.todo ("Debe retornar 400 cuando el cuerpo esta vacio")
			it.todo ("Debe retornar 201 cuando se crea el whisper")
			*/
			it ("Debe retornar 400 cuando el cuerpo esta vacio",async () =>{
				const response = await supertest(app).post(`/api/v1/whisper/`).send ({})
				expect (response.status).toBe (400)
			})			
			
			it ("Debe retornar 400 cuando el body es invalido",async () =>{
				const response = await supertest(app).post(`/api/v1/whisper/`).send ({invented: "This is a new whisper"})
				expect (response.status).toBe (400)
			})	
			
			
		
			it ("Debe retornar 201 cuando se crea el whisper" ,async () => {
				const response = await supertest(app).post(`/api/v1/whisper/`).send ({message : newWhisper.message})
				//Respuesta HTTP
				expect (response.status).toBe (201)
				expect (response.body).toEqual (newWhisper.id)
				
				//cambios en la Db
				const storedWhisper = await getById (newWhisper.id)
				expect (storedWhisper).toStrictEqual (newWhisper)
			})
			
	})

	describe ("PUT /api/v1/whisper/:id", () => {
		/*
			it.todo ("Debe retornar 400 cuando el cuerpo esta vacio")
			it.todo ("Debe retornar 400 cuando el cuerpo es invalido")
			it.todo ("Debe retornar 404 cuando el whisper no existe")
			it.todo ("Debe retornar 200 cuando se actualiza whisper")						
		*/
		it ("Debe retornar 400 cuando el cuerpo esta vacio",async () =>{
			const response = await supertest (app).put (` /api/v1/whisper/${existingId}`).send({})
			expect (response.status).toBe(400)
		})
		
		it ("Debe retornar 400 cuando el cuerpo es invalido",async () =>{
			const response = await supertest (app).put (` /api/v1/whisper/${existingId}`).send({invented: "This is a new field"})
			expect (response.status).toBe(400)
		})	
		
		it ("Debe retornar 404 cuando el whisper no existe",async () =>{
			const response = await supertest (app).put (` /api/v1/whisper/${inventedId}`).send({message: "Whisper actualizado"})
			expect (response.status).toBe(404)
		})	
		
		it ("Debe retornar 200 cuando se actualiza whisper",async () =>{
			const response = await supertest (app).put (` /api/v1/whisper/${existingId}`).send({message: "Whisper actualizado"})
			expect (response.status).toBe(200)
			
			//La Db cambia
			const storedWhisper = await getById (existingId)
			expect (storedWhisper).toStrictEqual({id:existingId, message: "Whisper updated"})			
			
		})

		
		
	})
	
	describe ("DELETE /api/v1/whisper/:id", () =>{
		/*
			it.todo ("Debe retornar 404 cuando el whisper no existe")
			it.todo ("Debe retornar 200 cuando se borra whisper")			
			it.todo ("Debe retornar 200 cuando se borra whisper")
		*/
		it ("Debe retornar 404 cuando el whisper no existe",async () => {
			const response = await supertest (app).delete (` /api/v1/whisper/${existingId}`)
			expect (response.status).toBe(404)
		})
		
		it ("Debe retornar 200 cuando se borra whisper",async () => {
			const response = await supertest (app).delete (` /api/v1/whisper/${existingId}`)
			expect (response.status).toBe(200)
			
			//Cambios en Db
			
			const storedWhisper = await getById(existingId)
			expect (storedWhisper).toBeUndefined()
			
		})			
	})
	
	
})
