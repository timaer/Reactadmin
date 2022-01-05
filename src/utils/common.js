import { post } from 'axios/axios.js'
import { Notification } from 'element-react'


window.$msg=(message,type='info')=>{
  Notification({
    message: message,
    type: type
  });
}
window.$post=(url,data)=>{return post(url,data);}


window.$timeToDate=(timestamp)=>{
  const date = new Date(timestamp*1000);
  return date.getFullYear() + '-'+
  (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'+
  date.getDate() + ' '+
  date.getHours() + ':'+
  date.getMinutes() + ':'+
  date.getSeconds()
}
