import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, showMe, update, destroy } from './controller'
import { schema } from './model'
export Record, { schema } from './model'

const router = new Router()
const { accountId, type, amount, currency, category, icon, color, notes, place, date, paymentType, labels, photo } = schema.tree

/**
 * @api {post} /records Create record
 * @apiName CreateRecord
 * @apiGroup Record
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam accountId Record's accountId.
 * @apiParam type Record's type.
 * @apiParam amount Record's amount.
 * @apiParam currency Record's currency.
 * @apiParam category Record's category.
 * @apiParam notes Record's notes.
 * @apiParam place Record's place.
 * @apiParam date Record's date.
 * @apiParam paymentType Record's paymentType.
 * @apiParam labels Record's labels.
 * @apiParam photo Record's photo.
 * @apiSuccess {Object} record Record's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Record not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ accountId, type, amount, currency, category, icon, color, notes, place, date, paymentType, labels, photo }),
  create)

/**
 * @api {get} /records Retrieve records
 * @apiName RetrieveRecords
 * @apiGroup Record
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} records List of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /records/:id Retrieve record
 * @apiName RetrieveRecord
 * @apiGroup Record
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} record Record's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Record not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {get} /records/me Retrieve records from user
 * @apiName RetrieveRecords
 * @apiGroup Records
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} Records records's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 records not found.
 * @apiError 401 user access only.
 */
router.get('/me/:id',
  token({ required: true }),
  showMe)

/**
 * @api {put} /records/:id Update record
 * @apiName UpdateRecord
 * @apiGroup Record
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam accountId Record's accountId.
 * @apiParam type Record's type.
 * @apiParam amount Record's amount.
 * @apiParam currency Record's currency.
 * @apiParam category Record's category.
 * @apiParam notes Record's notes.
 * @apiParam place Record's place.
 * @apiParam date Record's date.
 * @apiParam paymentType Record's paymentType.
 * @apiParam labels Record's labels.
 * @apiParam photo Record's photo.
 * @apiSuccess {Object} record Record's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Record not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ accountId, type, amount, currency, category, icon, color, notes, place, date, paymentType, labels, photo }),
  update)

/**
 * @api {delete} /records/:id Delete record
 * @apiName DeleteRecord
 * @apiGroup Record
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Record not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
