import { getStore } from '@netlify/blobs'

export function getPhotoStore() {
  return getStore('device-photos')
}
