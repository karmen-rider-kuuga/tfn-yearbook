import axios from 'axios'

const httpClient = axios.create({
 baseURL: 'http://10.0.4.125:3000',
 //  baseURL: 'https://5efc-49-48-130-127.ngrok-free.app',
 timeout: 30000,
 headers: {
  'Content-Type': 'application/json',
 },
})

httpClient.interceptors.request.use(
 async (config: any) => {
  // const token = useAuthStore.getState().accessToken
  const token = ''
  if (token) {
   config.headers.Authorization = `Bearer ${token}`
  }
  return config
 },
 (error) => {
  return Promise.reject(error)
 }
)

let isRefreshing = false
let refreshSubscribers: any[] = []

const addRefreshSubscriber = (callback: (accessToken: string) => void) => {
 refreshSubscribers.push(callback)
}

httpClient.interceptors.response.use(
 (response) => response,
 async (error) => {
  const { response, config } = error

  // ตรวจสอบว่า error 401 และไม่ใช่ login request
  if (response && response.status === 401 && !config.url.includes('login')) {
   const originalRequest = config

   return new Promise((resolve, reject) => {
    addRefreshSubscriber((accessToken) => {
     originalRequest.headers.Authorization = `Bearer ${accessToken}`
     resolve(httpClient(originalRequest))
    })
   })
  }

  // หากเป็น login request หรือไม่สามารถ refresh token ได้
  return Promise.reject(error)
 }
)

export default httpClient
