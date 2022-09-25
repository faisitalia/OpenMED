/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import mongoose from 'mongoose'
import { FacilityDoc } from './facility'

// An interface that describes the properties
// that are required to create a new Visit
interface VisitAttrs {
  facility: FacilityDoc
  patientId: string
  doctorId: string
  caregiverId: string
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
  patientId: string
  doctorId: string
  caregiverId: string
  slot: Date
}

const visitSchema = new mongoose.Schema(
  {
    facility: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Facility',
    },
    patientId: {
      required: true,
      type: String,
    },
    doctorId: {
      required: true,
      type: String,
    },
    caregiverId: {
      required: true,
      type: String,
    },
    slot: {
      type: Date,
      required: true,
    },
  },
  {
    collection: 'visit',
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
