import { createUser, deleteUserById } from '..'

it('should create an user', async () => {
  const username = 'john.doe'
  const email = 'john.doe@email.test'
  const password = '12345678'
  const userId = await createUser(username, email, password)

  expect(userId).toBeDefined()

  await deleteUserById(userId)
})

it.skip('should create an user with attributes', async () => {

})
