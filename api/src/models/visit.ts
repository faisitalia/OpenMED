import mongoose from 'mongoose'
import { FacilityDoc } from './facility'
import { UserDoc } from './user'

// An interface that describes the properties
// that are required to create a new Visit
interface VisitAttrs {
  facility: FacilityDoc
  patient: UserDoc
  doctor: UserDoc
  caregiver: UserDoc
  slot: Date
}

// An interface that describes the properties
// that a Visit Model has
interface VisitModel extends mongoose.Model<VisitDoc> {
  build(attrs: VisitAttrs): VisitDoc
}

// An interface that describes the properties
// that a Visit Document has
interface VisitDoc extends mongoose.Document {
  facility: FacilityDoc
  patient: UserDoc
  doctor: UserDoc
  caregiver: UserDoc
  slot: Date
}

const visitSchema = new mongoose.Schema(
  {
    facility: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Facility',
    },
    patient: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    doctor: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    caregiver: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    slot: {
      type: Date,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      },
    },
  }
)

visitSchema.statics.build = (attrs: VisitAttrs) => {
  return new Visit(attrs)
}

const Visit = mongoose.model<VisitDoc, VisitModel>('Visit', visitSchema)

export { Visit, VisitDoc, VisitAttrs }
