import { createRole, findRoleByRoleName, deleteRoleByRoleName } from '..'
import { Role } from '../../../models/user'

it('should delete a role', async () => {
  const newRole = Role.PUBLISHER

  const findRoleBefore = await findRoleByRoleName(newRole)
  expect(findRoleBefore).toBeNull()

  const createdRole = await createRole(newRole)
  expect(createdRole.roleName).toStrictEqual(newRole)

  await deleteRoleByRoleName(newRole)

  const findRoleAfter = await findRoleByRoleName(newRole)
  expect(findRoleAfter).toBeNull()
})
