import { constants } from 'http2'

import { createRole, findRoleByRoleName, deleteRoleByRoleName } from '..'
import { Role } from '../../../models/user'

it('should create a role', async () => {
  const newRole = Role.PUBLISHER

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

it('should return a conflict error creating an already existing role', async () => {
  const newRole = Role.PUBLISHER

  await createRole(newRole)

  try {
    await createRole(newRole)
  } catch (error: any) {
    const response = error.response

    expect(response.status).toStrictEqual(constants.HTTP_STATUS_CONFLICT)
    expect(response.data.errorMessage).toStrictEqual('Role with name PUBLISHER already exists')

    await deleteRoleByRoleName(newRole)
  }
})
