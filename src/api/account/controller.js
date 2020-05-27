import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Account } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Account.create({ ...body, userId: user })
    .then((account) => account.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Account.find(query, select, cursor)
    .populate('userId')
    .then((accounts) => accounts.map((account) => account.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Account.findById(params.id)
    .populate('userId')
    .then(notFound(res))
    .then((account) => account ? account.view() : null)
    .then(success(res))
    .catch(next)

export const showMe = ({ params }, res, next) =>
  Account.find({ userId: params.id })
    .then((accounts) => accounts.map((account) => account.view()))
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Account.findById(params.id)
    .populate('userId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'userId'))
    .then((account) => account ? Object.assign(account, body).save() : null)
    .then((account) => account ? account.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Account.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'userId'))
    .then((account) => account ? account.remove() : null)
    .then(success(res, 204))
    .catch(next)
