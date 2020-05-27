import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, showMe, update, destroy } from './controller'
import { schema } from './model'
export Account, { schema } from './model'

const router = new Router()
const { name, color, accountType, startingAmount, currency, balance, active } = schema.tree

/**
 * @api {post} /accounts Create account
 * @apiName CreateAccount
 * @apiGroup Account
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Account's name.
 * @apiParam color Account's color.
 * @apiParam accountType Account's accountType.
 * @apiParam startingAmount Account's startingAmount.
 * @apiParam currency Account's currency.
 * @apiParam balance Account's balance.
 * @apiSuccess {Object} account Account's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Account not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, color, accountType, startingAmount, currency, balance, active }),
  create)

/**
 * @api {get} /accounts Retrieve accounts
 * @apiName RetrieveAccounts
 * @apiGroup Account
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} accounts List of accounts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /accounts/:id Retrieve account
 * @apiName RetrieveAccount
 * @apiGroup Account
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} account Account's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Account not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {get} /accounts/me Retrieve accounts from user
 * @apiName RetrieveAccount
 * @apiGroup Account
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} account Account's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Account not found.
 * @apiError 401 user access only.
 */
router.get('/me/:id',
  token({ required: true }),
  showMe)

/**
 * @api {put} /accounts/:id Update account
 * @apiName UpdateAccount
 * @apiGroup Account
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Account's name.
 * @apiParam color Account's color.
 * @apiParam accountType Account's accountType.
 * @apiParam startingAmount Account's startingAmount.
 * @apiParam currency Account's currency.
 * @apiParam balance Account's balance.
 * @apiSuccess {Object} account Account's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Account not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, color, accountType, startingAmount, currency, balance, active }),
  update)

/**
 * @api {delete} /accounts/:id Delete account
 * @apiName DeleteAccount
 * @apiGroup Account
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Account not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
