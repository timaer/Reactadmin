import './index.css'
import {Dropdown,Switch} from 'element-react'
import Icon from 'component/icon'
import {doLogout} from 'redux/Slices/userSlice'
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BreadNav from 'component/breadnav'
import {emptyTabView,setIsTabView} from 'redux/Slices/appSlice'
import FoldBtn from 'component/foldbtn'

function TopNav(){
    let dispatch=useDispatch()
    let navigate=useNavigate()
    let ismobile=useSelector(state=>state.user.ismobile)
    let username=useSelector(state=>state.user.username)
    let isTabView=useSelector(state=>state.app.isTabView)
    let isMenuFolded=useSelector(state=>state.app.isMenuFold)

    const doCommand=(command)=>{
        if(command==='exit')
        {
            dispatch(emptyTabView())
            dispatch(doLogout())
            setTimeout(()=>{navigate("/login")},500)
        }
    }
    const toggleMode=(value)=>{
        dispatch(setIsTabView(value))
    }
    return(
        <div className={isMenuFolded?'app-righttop-folded':'app-righttop'}>       
            <div className='topbar-container'>
                <div className='topbar-left'>
                        <FoldBtn/>
                        <BreadNav isshow={!ismobile}/>
                </div>
                <div className='topbar-right'>
                        <div className='toggle'> 
                            多标签
                            <Switch
                                value={isTabView}
                                onText=""
                                offText=""
                                onColor='#13CE66'
                                onChange={(value)=>toggleMode(value)}		
                                >
                            </Switch>
                        </div> 
                        <div className='welcome'>欢迎您,{username}</div>
                        <Icon src='exit' className='exiticon'/> 
                        <Dropdown menu={(
                                <Dropdown.Menu>
                                <Dropdown.Item command='exit'>退出系统</Dropdown.Item>
                                </Dropdown.Menu>
                            )} onCommand={(e)=>doCommand(e)}>
                            <span className="el-dropdown-link">
                                退出<i className="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                        </Dropdown>
                </div>
            </div>
       </div>
    )
}
export default TopNav