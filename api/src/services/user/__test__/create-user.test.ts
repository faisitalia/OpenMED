import { createUser, deleteUserById, getUserById } from '../index'
import { Role } from '../../../models/user'

it('should create an user', async () => {
  const firstname = 'John'
  const lastname = 'New'
  const birthdate = new Date()
  const username = 'john.new'
  const email = 'john.new@email.test'
  const password = '12345678'
  const userId = await createUser(firstname, lastname, birthdate, username, email, password, Role.USER)

  expect(userId).toBeDefined()

  await deleteUserById(userId)
})

it('should create an user with attributes', async () => {
  const firstname = 'John'
  const lastname = 'Attributes'
  const birthdate = new Date()
  const username = 'john.attributes'
  const email = 'john.attributes@email.test'
  const password = '12345678'
  const newDate = new Date()
  const newData = 12345

  const attributes = {
    newDate,
    newData
  }
  const userId = await createUser(firstname, lastname, birthdate, username, email, password, Role.USER, attributes)
  expect(userId).toBeDefined()

  // retrieve the user just created
  const user = await getUserById(userId)

  expect(new Date(user?.attributes?.newDate[0])).toStrictEqual(newDate)
  expect(user?.attributes?.newData[0]).toStrictEqual(newData.toString())

  await deleteUserById(userId)
})
