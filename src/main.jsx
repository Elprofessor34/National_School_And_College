import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// IndexedDB-backed storage that matches the window.storage API.
// IndexedDB gives us effectively unlimited space (browsers allow hundreds of MB
// to gigabytes per origin), which is what we need for 500+ students + photos.
const DB_NAME = 'nsc-school'
const STORE = 'kv'
let dbPromise = null

function getDB() {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1)
      req.onupgradeneeded = () => {
        const db = req.result
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE)
      }
      req.onsuccess = () => resolve(req.result)
      req.onerror = () => reject(req.error)
    })
  }
  return dbPromise
}

async function withStore(mode, fn) {
  const db = await getDB()
  return new Promise((resolve, reject) => {
    const t = db.transaction(STORE, mode)
    const s = t.objectStore(STORE)
    const result = fn(s)
    t.oncomplete = () => resolve(result)
    t.onerror = () => reject(t.error)
    t.onabort = () => reject(t.error)
  })
}

if (typeof window !== 'undefined') {
  window.storage = {
    async get(key) {
      try {
        let val
        await withStore('readonly', s => {
          const r = s.get(key)
          r.onsuccess = () => { val = r.result }
        })
        return val === undefined ? null : { key, value: val }
      } catch (e) {
        // Fallback to localStorage if IndexedDB is unavailable
        try {
          const v = localStorage.getItem(key)
          return v === null ? null : { key, value: v }
        } catch { return null }
      }
    },
    async set(key, value) {
      try {
        await withStore('readwrite', s => s.put(value, key))
        return { key, value }
      } catch (e) {
        try { localStorage.setItem(key, value); return { key, value } }
        catch (err) { throw err }
      }
    },
    async delete(key) {
      try {
        await withStore('readwrite', s => s.delete(key))
        return { key, deleted: true }
      } catch (e) {
        try { localStorage.removeItem(key); return { key, deleted: true } }
        catch { return null }
      }
    },
    async list(prefix) {
      try {
        let keys = []
        await withStore('readonly', s => {
          const r = s.getAllKeys()
          r.onsuccess = () => {
            const all = r.result || []
            keys = prefix ? all.filter(k => typeof k === 'string' && k.startsWith(prefix)) : all
          }
        })
        return { keys, prefix }
      } catch (e) {
        return { keys: [], prefix }
      }
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
