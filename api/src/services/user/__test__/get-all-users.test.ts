import { createUser, deleteUserById, getAllUsers } from '../index'
import { Role } from '../../../models/user'

it('should retrieve all the users', async () => {
  const firstname = 'John'
  const lastname = 'New'
  const birthdate = new Date()
  const username = 'john.new'
  const email = 'john.new@email.test'
  const password = '12345678'
  const userId = await createUser(
    firstname,
    lastname,
    birthdate,
    username,
    email,
    password,
    Role.USER
  )
  expect(userId).toBeDefined()

  const doctorUsername = 'doctor.all.users'
  const doctorFirstname = 'John-doctor'
  const doctorLastname = 'Doe-doctor'
  const doctorBirthdate = new Date()
  const doctorEmail = 'doctor-all-users@openmed.cloud'
  const doctorPassword = 'password'
  const doctorId = await createUser(
    doctorFirstname,
    doctorLastname,
    doctorBirthdate,
    doctorUsername,
    doctorEmail,
    doctorPassword,
    Role.DOCTOR
  )
  expect(doctorId).toBeDefined()

  const allUsers = await getAllUsers()
  const testUsers = allUsers.filter((user) => user.person && user.person.id)
  expect(testUsers).toHaveLength(2)

  expect(testUsers[0].username).toStrictEqual(doctorUsername)
  expect(testUsers[0].email).toStrictEqual(doctorEmail)
  expect(testUsers[0].person?.firstname).toStrictEqual(doctorFirstname)
  expect(testUsers[0].person?.lastname).toStrictEqual(doctorLastname)
  expect(testUsers[0].person?.birthdate).toStrictEqual(doctorBirthdate)

  expect(testUsers[1].username).toStrictEqual(username)
  expect(testUsers[1].email).toStrictEqual(email)
  expect(testUsers[1].person?.firstname).toStrictEqual(firstname)
  expect(testUsers[1].person?.lastname).toStrictEqual(lastname)
  expect(testUsers[1].person?.birthdate).toStrictEqual(birthdate)

  await deleteUserById(userId)
  await deleteUserById(doctorId)
})
