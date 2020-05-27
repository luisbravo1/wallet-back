import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Record } from '.'
import { Account } from '../account'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Record.create({ ...body, userId: user })
    .then((record) => {
      Account.findByIdAndUpdate({ _id: body.accountId }, { $inc: { balance: body.amount }})
        .then((account) => record.view(true))
        .then(success(res, 201))
        .catch(next)
    })

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Record.find(query, select, cursor)
    .populate('userId')
    .then((records) => records.map((record) => record.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Record.findById(params.id)
    .populate('userId')
    .then(notFound(res))
    .then((record) => record ? record.view() : null)
    .then(success(res))
    .catch(next)

export const showMe = ({ params }, res, next) =>
  Record.find({ userId: params.id }).sort({ date: -1 })
    .populate('accountId')
    .then((records) => records.map((record) => record.view()))
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Record.findById(params.id)
    .populate('userId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'userId'))
    .then((record) => record ? Object.assign(record, body).save() : null)
    .then((record) => record ? record.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Record.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'userId'))
    .then((record) => record ? record.remove() : null)
    .then(success(res, 204))
    .catch(next)
