import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Record } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, record

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  record = await Record.create({ userId: user })
})

test('POST /records 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, accountId: 'test', type: 'test', amount: 'test', currency: 'test', category: 'test', notes: 'test', place: 'test', date: 'test', paymentType: 'test', labels: 'test', photo: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.accountId).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.amount).toEqual('test')
  expect(body.currency).toEqual('test')
  expect(body.category).toEqual('test')
  expect(body.notes).toEqual('test')
  expect(body.place).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.paymentType).toEqual('test')
  expect(body.labels).toEqual('test')
  expect(body.photo).toEqual('test')
  expect(typeof body.userId).toEqual('object')
})

test('POST /records 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /records 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].userId).toEqual('object')
})

test('GET /records 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /records/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${record.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(record.id)
  expect(typeof body.userId).toEqual('object')
})

test('GET /records/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${record.id}`)
  expect(status).toBe(401)
})

test('GET /records/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /records/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${record.id}`)
    .send({ access_token: userSession, accountId: 'test', type: 'test', amount: 'test', currency: 'test', category: 'test', notes: 'test', place: 'test', date: 'test', paymentType: 'test', labels: 'test', photo: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(record.id)
  expect(body.accountId).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.amount).toEqual('test')
  expect(body.currency).toEqual('test')
  expect(body.category).toEqual('test')
  expect(body.notes).toEqual('test')
  expect(body.place).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.paymentType).toEqual('test')
  expect(body.labels).toEqual('test')
  expect(body.photo).toEqual('test')
  expect(typeof body.userId).toEqual('object')
})

test('PUT /records/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${record.id}`)
    .send({ access_token: anotherSession, accountId: 'test', type: 'test', amount: 'test', currency: 'test', category: 'test', notes: 'test', place: 'test', date: 'test', paymentType: 'test', labels: 'test', photo: 'test' })
  expect(status).toBe(401)
})

test('PUT /records/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${record.id}`)
  expect(status).toBe(401)
})

test('PUT /records/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, accountId: 'test', type: 'test', amount: 'test', currency: 'test', category: 'test', notes: 'test', place: 'test', date: 'test', paymentType: 'test', labels: 'test', photo: 'test' })
  expect(status).toBe(404)
})

test('DELETE /records/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${record.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /records/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${record.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /records/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${record.id}`)
  expect(status).toBe(401)
})

test('DELETE /records/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
