import { Visit, VisitAttrs } from '../../models/visit'

/**
 *
 * @param visit
 */
async function createVisit(visit: VisitAttrs) {
  const visitDoc = Visit.build(visit)
  return await visitDoc.save()
}

export { createVisit }
