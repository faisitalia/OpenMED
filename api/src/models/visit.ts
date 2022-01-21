import mongoose from 'mongoose'

// An interface that describes the properties
// that are required to create a new Visit
interface VisitAttrs {
  facilityId: string
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
  facilityId: string
  patientId: string
  doctorId: string
  caregiverId: string
  slot: Date
}

const visitSchema = new mongoose.Schema(
  {
    facilityId: {
      required: true,
      type: String,
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
      required: false,
      type: String,
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

export { Visit, VisitDoc }
