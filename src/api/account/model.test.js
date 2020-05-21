import { Account } from '.'
import { User } from '../user'

let user, account

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  account = await Account.create({ userId: user, name: 'test', color: 'test', accountType: 'test', startingAmount: 'test', currency: 'test', balance: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = account.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(account.id)
    expect(typeof view.userId).toBe('object')
    expect(view.userId.id).toBe(user.id)
    expect(view.name).toBe(account.name)
    expect(view.color).toBe(account.color)
    expect(view.accountType).toBe(account.accountType)
    expect(view.startingAmount).toBe(account.startingAmount)
    expect(view.currency).toBe(account.currency)
    expect(view.balance).toBe(account.balance)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = account.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(account.id)
    expect(typeof view.userId).toBe('object')
    expect(view.userId.id).toBe(user.id)
    expect(view.name).toBe(account.name)
    expect(view.color).toBe(account.color)
    expect(view.accountType).toBe(account.accountType)
    expect(view.startingAmount).toBe(account.startingAmount)
    expect(view.currency).toBe(account.currency)
    expect(view.balance).toBe(account.balance)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
