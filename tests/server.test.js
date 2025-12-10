
import supertest from 'supertest'
import {app} from '../server'
import {restoreDb,populateDb} from './utils'
import {whispers, inventedId,existingId} from './fixtures.js'

import {getByid} from '../store'

describe ('Server', () =>{
	beforeEach (() => populateDb (whispers))
	afterAll (restoreDb)
	
	describe ("GET /api/v1/whisper", () => {
			it.todo ("Debe retornar un array vacio cuando no hay datos")
			it.todo ("Debe retornar todo el whisper")
	})
	
	describe ("GET /api/v1/whisper/:id", () =>{
			it.todo ("Debe retornar 404 cuando el whisper no existe")
			it.todo ("Debe retornar los detalles del whisper")
	})
	
	describe ("POST /api/v1/whisper ", () =>{
			it.todo ("Debe retornar 400 cuando el cuerpo esta vacio")
			it.todo ("Debe retornar 201 cuando se crea el whisper")
	})

	describe ("PUT /api/v1/whisper/:id", () => {
			it.todo ("Debe retornar 400 cuando el cuerpo esta vacio")
			it.todo ("Debe retornar 400 cuando el cuerpo es invalido")
			it.todo ("Debe retornar 404 cuando el whisper no existe")
			it.todo ("Debe retornar 200 cuando se actualiza whisper")						
	})
	
	describe ("DELETE /api/v1/whisper/:id", () =>{
			it.todo ("Debe retornar 404 cuando el whisper no existe")
			it.todo ("Debe retornar 200 cuando se borra whisper")			
			it.todo ("Debe retornar 200 cuando se borra whisper")			
	})
}
