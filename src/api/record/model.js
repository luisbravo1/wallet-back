import mongoose, { Schema } from 'mongoose'

const recordSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  accountId: {
    type: Schema.ObjectId,
    ref: 'Account',
    required: true
  },
  type: {
    type: String
  },
  amount: {
    type: Number
  },
  currency: {
    type: String
  },
  category: {
    type: String
  },
  icon: {
    type: String
  },
  color: {
    type: String
  },
  notes: {
    type: String
  },
  place: {
    type: String
  },
  date: {
    type: Date
  },
  paymentType: {
    type: String
  },
  labels: {
    type: String
  },
  photo: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

recordSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      userId: this.userId.view(full),
      accountId: this.accountId,
      type: this.type,
      amount: this.amount,
      currency: this.currency,
      category: this.category,
      icon: this.icon,
      color: this.color,
      notes: this.notes,
      place: this.place,
      date: this.date,
      paymentType: this.paymentType,
      labels: this.labels,
      photo: this.photo,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Record', recordSchema)

export const schema = model.schema
export default model
