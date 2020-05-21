import { Record } from '.'
import { User } from '../user'

let user, record

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  record = await Record.create({ userId: user, accountId: 'test', type: 'test', amount: 'test', currency: 'test', category: 'test', notes: 'test', place: 'test', date: 'test', paymentType: 'test', labels: 'test', photo: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = record.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(record.id)
    expect(typeof view.userId).toBe('object')
    expect(view.userId.id).toBe(user.id)
    expect(view.accountId).toBe(record.accountId)
    expect(view.type).toBe(record.type)
    expect(view.amount).toBe(record.amount)
    expect(view.currency).toBe(record.currency)
    expect(view.category).toBe(record.category)
    expect(view.notes).toBe(record.notes)
    expect(view.place).toBe(record.place)
    expect(view.date).toBe(record.date)
    expect(view.paymentType).toBe(record.paymentType)
    expect(view.labels).toBe(record.labels)
    expect(view.photo).toBe(record.photo)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = record.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(record.id)
    expect(typeof view.userId).toBe('object')
    expect(view.userId.id).toBe(user.id)
    expect(view.accountId).toBe(record.accountId)
    expect(view.type).toBe(record.type)
    expect(view.amount).toBe(record.amount)
    expect(view.currency).toBe(record.currency)
    expect(view.category).toBe(record.category)
    expect(view.notes).toBe(record.notes)
    expect(view.place).toBe(record.place)
    expect(view.date).toBe(record.date)
    expect(view.paymentType).toBe(record.paymentType)
    expect(view.labels).toBe(record.labels)
    expect(view.photo).toBe(record.photo)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
