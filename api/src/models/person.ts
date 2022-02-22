/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import mongoose from 'mongoose'

// An interface that describes the properties
// that are required to create a new Person
interface PersonAttrs {
  firstname: string
  lastname: string
  birthdate: Date
}

// An interface that describes the properties
// that a Person Model has
interface PersonModel extends mongoose.Model<PersonDoc> {
  build(attrs: PersonAttrs): PersonDoc
}

// An interface that describes the properties
// that a Person Document has
interface PersonDoc extends mongoose.Document {
  firstname: string
  lastname: string
  birthdate: Date
}

const personSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v
      },
    },
  }
)

personSchema.statics.build = (attrs: PersonAttrs) => {
  return new Person(attrs)
}

const Person = mongoose.model<PersonDoc, PersonModel>('Person', personSchema)

export { Person, PersonDoc }
