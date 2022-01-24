import mongoose from 'mongoose'

// An interface that describes the properties
// that are required to create a new Facility
interface FacilityAttrs {
  name: string
  email: string
  street: string
  town: string
  state: string
  county: string
  country: string
  postalcode: number
}

// An interface that describes the properties
// that a Facility Model has
interface FacilityModel extends mongoose.Model<FacilityDoc> {
  build(attrs: FacilityAttrs): FacilityDoc
}

// An interface that describes the properties
// that a Facility Document has
interface FacilityDoc extends mongoose.Document {
  name: string
  email: string
  street: string
  town: string
  state: string
  county: string
  country: string
  postalcode: number
  domain_identifier: string
  location: object
}

const FacilitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    street: {
      type: String,
      required: true,
    },
    town: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    county: {
      type: String,
      required: true,
    },
    postalcode: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    domain_identifier: {
      type: String,
      required: false,
    },
    location: {
      type: { type: String },
      coordinates: [],
      required: false,
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

FacilitySchema.index({ location: '2dsphere' })

FacilitySchema.statics.build = (attrs: FacilityAttrs) => {
  return new Facility(attrs)
}

const Facility = mongoose.model<FacilityDoc, FacilityModel>('Facility', FacilitySchema)

export { Facility, FacilityAttrs }
