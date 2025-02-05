import axios from 'axios'
import httpClient from './interceptors'

interface APIOptions {
 timeout?: number
 url: string
 method?: 'get' | 'post' | 'put' | 'delete' | 'GET' | 'POST' | 'PUT' | 'DELETE'
 data?: any
 headers?: any
 params?: any
}

export const UseAPI = async ({ timeout, ...options }: APIOptions) => {
 const source = axios.CancelToken.source()
 let id =
  timeout &&
  setTimeout(() => {
   id = 0
   source.cancel(`timeout`)
  }, timeout || 30000)
 try {
  return await httpClient({
   cancelToken: source.token,
   ...options,
  })
 } finally {
  id && clearTimeout(id)
 }
}
