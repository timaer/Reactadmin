import axios from 'axios'
import qs from 'qs'
import store from 'redux/store.js'
import {doLogout} from 'redux/Slices/userSlice'
import {setLoading} from 'redux/Slices/appSlice'

//此处从redux获取系统userid以构造登陆令牌，放到headers里

const fireWall=(data)=>{
    if(data.result.success===444){
        window.$msg(data.result.info,'danger');
        store.dispatch(doLogout())
        setTimeout(()=>{window.location.href=process.env.REACT_APP_HOMEPAGE},1000)
    }
}
const config={
    baseURL: process.env.REACT_APP_BACKEND_API, //http://localhost/myjob/public/index.php/vueadmin
    timeout: 10000
  }

async function get(url,data){
    config['url']=url
    config['headers']={'vadmintoken':store.getState().user.token,'Content-Type':'application/x-www-form-urlencoded'}
    config['method']='get'
    
    store.dispatch(setLoading(true))
    const result=await axios.post(url,qs.stringify(data),config)
    store.dispatch(setLoading(false))

    fireWall(result.data)
    return result.data
}

async function post(url,data){
    config['url']=url
    config['headers']={'vadmintoken':store.getState().user.token,'Content-Type':'application/x-www-form-urlencoded'}
    config['method']='post'

    store.dispatch(setLoading(true))
    const result=await axios.post(url,qs.stringify(data),config)
    store.dispatch(setLoading(false))

    fireWall(result.data)
    return result.data
}

export {get,post} 