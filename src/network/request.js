import axios from 'axios'

export function request(config) {
    //1.创建axios实例
    const instance = axios.create({ //create里写的是公共的参数
      baseURL: 'http://152.136.185.210:8000/api/n3',
      timeout: 5000
    })

    //2.axios的拦截器
    instance.interceptors.request.use(config => { 
      return config; //拦截之后要返回回去，否则就被拦截请求失败了
    }, err => {
      console.log(err);
    })

    instance.interceptors.response.use(res => {
      // console.log(res);
      return res.data; //拦截之后要返回回去，只返回data就可以
    }, err => {
      console.log(err);
    })

    //3.发送真正的网络请求
    return instance(config) //instance()相当于axios()
}
