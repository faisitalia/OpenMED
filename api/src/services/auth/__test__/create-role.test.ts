import { createRole, findRoleByRoleName, deleteRoleByRoleName } from '..'

it('should create a role', async () => {
  const newRole = 'publisher'

  const findRoleBefore = await findRoleByRoleName(newRole)
  expect(findRoleBefore).toBeNull()

  const createdRole = await createRole(newRole)

  expect(createdRole.roleName).toStrictEqual(newRole)

  const findRoleAfter = await findRoleByRoleName(newRole)
  expect(findRoleAfter).toBeDefined()
  expect(findRoleAfter?.id).toBeDefined()
  expect(findRoleAfter?.name).toStrictEqual(newRole)

  await deleteRoleByRoleName(newRole)
})

it.skip('should failed creating an already existing role', async () => {
  const newRole = 'publisher'
  await createRole(newRole)
  await createRole(newRole)

  // find the role on keycloak to check the creation
  // await deleteUserById(userId)
})
