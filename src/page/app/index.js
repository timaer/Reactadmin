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
    const isMenuFolded=useSelector(state=>state.app.isMenuFold)
    const NormalView=<RouterView />
    const FrameView=(
          <>
            <SideNav/>
            <div className={isMenuFolded?'app-right-folded':'app-right'}>
                  <TopNav/>        
                  <div className='app-maincontent'>
                      <Loading loading={loading}>
                               <TabView isTabView={isTabView}>
                                    <RouterView/>
                                </TabView>
                        </Loading> 
                  </div>
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