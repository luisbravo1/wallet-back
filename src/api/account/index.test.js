import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Account } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, account

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  account = await Account.create({ userId: user })
})

test('POST /accounts 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', color: 'test', accountType: 'test', startingAmount: 'test', currency: 'test', balance: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.color).toEqual('test')
  expect(body.accountType).toEqual('test')
  expect(body.startingAmount).toEqual('test')
  expect(body.currency).toEqual('test')
  expect(body.balance).toEqual('test')
  expect(typeof body.userId).toEqual('object')
})

test('POST /accounts 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /accounts 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].userId).toEqual('object')
})

test('GET /accounts 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /accounts/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${account.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(account.id)
  expect(typeof body.userId).toEqual('object')
})

test('GET /accounts/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${account.id}`)
  expect(status).toBe(401)
})

test('GET /accounts/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /accounts/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${account.id}`)
    .send({ access_token: userSession, name: 'test', color: 'test', accountType: 'test', startingAmount: 'test', currency: 'test', balance: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(account.id)
  expect(body.name).toEqual('test')
  expect(body.color).toEqual('test')
  expect(body.accountType).toEqual('test')
  expect(body.startingAmount).toEqual('test')
  expect(body.currency).toEqual('test')
  expect(body.balance).toEqual('test')
  expect(typeof body.userId).toEqual('object')
})

test('PUT /accounts/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${account.id}`)
    .send({ access_token: anotherSession, name: 'test', color: 'test', accountType: 'test', startingAmount: 'test', currency: 'test', balance: 'test' })
  expect(status).toBe(401)
})

test('PUT /accounts/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${account.id}`)
  expect(status).toBe(401)
})

test('PUT /accounts/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, name: 'test', color: 'test', accountType: 'test', startingAmount: 'test', currency: 'test', balance: 'test' })
  expect(status).toBe(404)
})

test('DELETE /accounts/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${account.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /accounts/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${account.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /accounts/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${account.id}`)
  expect(status).toBe(401)
})

test('DELETE /accounts/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
