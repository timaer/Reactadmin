import './index.scss'
import Icon from 'component/icon'
import { Button } from 'element-react';
import {useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {doLoginAction} from 'redux/Slices/userSlice';

function Login(){
   let navigate = useNavigate()
   const dispatch  = useDispatch()
   const [username,setUsername]=useState('reactadmin')
   const [password,setPassword]=useState('reactadmin')
   const doLogin=()=>{
      if(username===''){
           window.$msg("用户名不能为空");return;
      }
      if(password===''){
           window.$msg("密码不能为空");return;
      }
      dispatch(doLoginAction({username:username,password:password})).then((result)=>{
        let data=result.payload
        if(data && data.result.success){
            navigate('/')
        }else{
            let msg=data!==undefined?data.result.info:'网络出错，请稍后再试'
            window.$msg(msg)
        }
      })
   } 
   return(
       <div id='loginout'>
       <div id='logincon'>
                <div className='logo'>
                    <Icon src='login' className='logoimg'/>
                </div>
                <div className='title'>ReactAdmin后台管理</div>
                <div className='subtitle'>用户名:reactadmin 密码:reactadmin</div>
                <div className='loginform'>
                    <div className='login-input'>
                        <div className='login-input-icon'><Icon src='user' className='login-input-svg'/></div><div className='login-input-content'> <input type='text' defaultValue='reactadmin' onChange={(e)=>setUsername(e.target.value)}/></div>
                    </div>
                    <div className='login-input'>
                        <div className='login-input-icon'><Icon src='password' className='login-input-svg'/></div><div className='login-input-content'> <input type='password' defaultValue='reactadmin' onChange={(e)=>setPassword(e.target.value)} /></div>
                    </div>
                    <div className='login-btn'>
                        <Button type="primary" block onClick={()=>doLogin()}>登  陆</Button>
                    </div>  
                </div>    
                <div className='bottomwords'>copyright@2021</div>
     </div> 
     </div>
   )
}

export default Login