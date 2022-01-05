import './index.scss'
import Icon from 'component/icon'
import {Button} from 'element-react'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {setActiveTab} from 'redux/Slices/appSlice'
function Error404(){
    let navigate=useNavigate()
    let dispatch=useDispatch()
    const goBack=()=>{
        dispatch(setActiveTab("index"))
        navigate('/index')
    }
    return(
        <div id='error404'>
              <div><Icon src='404' className='img'/></div>
              <div className='title'>很抱歉，没有找到所需要的页面</div>
              <div className='btn'><Button size="large" onClick={()=>goBack()}>返回</Button></div>
        </div>
    )
}

export default Error404