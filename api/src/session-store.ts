import expressSession, { Store } from 'express-session'

export class MemoryStore {
  private static instance: Store

  public static getInstance(): Store {
    if (!MemoryStore.instance) {
      // Create a session-store to be used by both the express-session
      // middleware and the keycloak middleware.
      MemoryStore.instance = new expressSession.MemoryStore()
    }

    return MemoryStore.instance
  }
}
