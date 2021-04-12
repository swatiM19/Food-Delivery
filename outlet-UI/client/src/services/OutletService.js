import Api from '@/services/Url'

export default {
  fetchOutlet (params) {
    console.log('paramssss', params);
    return Api().post('getOutlet', params)
  }
}
