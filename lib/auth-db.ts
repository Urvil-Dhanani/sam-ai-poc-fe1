// IndexedDB utility for authentication storage
const DB_NAME = "sam_ai_auth"
const DB_VERSION = 1
const USERS_STORE = "users"
const SESSIONS_STORE = "sessions"

export interface User {
  id: string
  email: string
  password: string
  role: "super-admin" | "association-admin" | "member"
  name: string
  associationId?: string
  associationName?: string
  isFirstLogin: boolean
  createdAt: number
}

export interface Session {
  id: string
  userId: string
  email: string
  role: string
  name: string
  associationName?: string
  createdAt: number
  expiresAt: number
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result

      if (!db.objectStoreNames.contains(USERS_STORE)) {
        const usersStore = db.createObjectStore(USERS_STORE, { keyPath: "id" })
        usersStore.createIndex("email", "email", { unique: true })
        usersStore.createIndex("role", "role", { unique: false })
      }

      if (!db.objectStoreNames.contains(SESSIONS_STORE)) {
        const sessionsStore = db.createObjectStore(SESSIONS_STORE, { keyPath: "id" })
        sessionsStore.createIndex("userId", "userId", { unique: false })
      }
    }
  })
}

export async function initializeDefaultUsers(): Promise<void> {
  const db = await openDB()

  const defaultUsers: User[] = [
    {
      id: "super-admin-1",
      email: "admin@samit.com",
      password: "admin123",
      role: "super-admin",
      name: "System Admin",
      isFirstLogin: false,
      createdAt: Date.now(),
    },
    {
      id: "assoc-admin-1",
      email: "association@aap.org",
      password: "assoc123",
      role: "association-admin",
      name: "Sarah Johnson",
      associationId: "aap-1",
      associationName: "AAP (American Pediatrics Association)",
      isFirstLogin: false,
      createdAt: Date.now(),
    },
    {
      id: "member-1",
      email: "john.doe@email.com",
      password: "member123",
      role: "member",
      name: "John",
      associationId: "aap-1",
      associationName: "AAP (American Pediatrics Association)",
      isFirstLogin: false,
      createdAt: Date.now(),
    },
  ]

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([USERS_STORE], "readwrite")
    const store = transaction.objectStore(USERS_STORE)

    defaultUsers.forEach((user) => {
      const getRequest = store.index("email").get(user.email)
      getRequest.onsuccess = () => {
        if (!getRequest.result) {
          store.add(user)
        }
      }
    })

    transaction.oncomplete = () => resolve()
    transaction.onerror = () => reject(transaction.error)
  })
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([USERS_STORE], "readonly")
    const store = transaction.objectStore(USERS_STORE)
    const request = store.index("email").get(email)

    request.onsuccess = () => resolve(request.result || null)
    request.onerror = () => reject(request.error)
  })
}

export async function createUser(user: User): Promise<void> {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([USERS_STORE], "readwrite")
    const store = transaction.objectStore(USERS_STORE)
    const request = store.add(user)

    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

export async function updateUser(user: User): Promise<void> {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([USERS_STORE], "readwrite")
    const store = transaction.objectStore(USERS_STORE)
    const request = store.put(user)

    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

export async function createSession(session: Session): Promise<void> {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([SESSIONS_STORE], "readwrite")
    const store = transaction.objectStore(SESSIONS_STORE)
    const request = store.add(session)

    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

export async function getSession(sessionId: string): Promise<Session | null> {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([SESSIONS_STORE], "readonly")
    const store = transaction.objectStore(SESSIONS_STORE)
    const request = store.get(sessionId)

    request.onsuccess = () => resolve(request.result || null)
    request.onerror = () => reject(request.error)
  })
}

export async function clearSession(sessionId: string): Promise<void> {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([SESSIONS_STORE], "readwrite")
    const store = transaction.objectStore(SESSIONS_STORE)
    const request = store.delete(sessionId)

    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function getRoleDashboardPath(role: string): string {
  switch (role) {
    case "super_admin":
      return "/super-admin"
    case "association-admin":
      return "/association-admin"
    case "member":
      return "/member-portal/dashboard"
    default:
      return "/"
  }
}
