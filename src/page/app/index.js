import './index.scss'
import { useLocation  } from 'react-router';
import SideNav from 'component/sidenav'
import TopNav from 'component/topnav'
import RouterView from 'router'
import {useEffect} from 'react'
import TabView from 'component/tabview'
import {Loading} from 'element-react'
import {useSelector} from 'react-redux'
 //此处可以定义系统大的框架（FrameWork，LOADING等）
function App(){
    const loading=useSelector(state=>state.app.loading)
    const isTabView=useSelector(state=>state.app.isTabView)
    const NormalView=<RouterView />
    const FrameView=(
          <>
            <div className='app-left'>
                  <SideNav/>
            </div>
            <div className='app-right'>
                  <div className='app-righttop'>
                     <TopNav/>  
                  </div>

                  <Loading loading={loading}>
                  <div className='app-maincontent'>
                       <TabView isTabView={isTabView}>
                            <RouterView/>
                        </TabView>
                  </div>
                  </Loading> 
            </div>
        </> 
    )
    
    const currentPath=useLocation().pathname
    const noFrameWorkPages=['/login']
    const mainView=noFrameWorkPages.includes(currentPath)?NormalView:FrameView
    
    useEffect(()=>{
      window.scrollTo(0,0)
    },[currentPath])
    
    return(
        <div id='app'>
            {mainView}
        </div>
    )  
}

export default App