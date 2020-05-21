import mongoose, { Schema } from 'mongoose'

const accountSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String
  },
  color: {
    type: String
  },
  accountType: {
    type: String
  },
  startingAmount: {
    type: String
  },
  currency: {
    type: String
  },
  balance: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

accountSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      userId: this.userId.view(full),
      name: this.name,
      color: this.color,
      accountType: this.accountType,
      startingAmount: this.startingAmount,
      currency: this.currency,
      balance: this.balance,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Account', accountSchema)

export const schema = model.schema
export default model
