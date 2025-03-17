export function createRandomId (length = 10) {
  let id = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let idx = 0; idx < length; idx++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return id
}