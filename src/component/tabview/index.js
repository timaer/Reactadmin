import './index.css'
import {Tabs} from 'element-react'
import Icon from 'component/icon'
import {useSelector,useDispatch} from 'react-redux'
import {setActiveTab,delTabView} from 'redux/Slices/appSlice'
import {useNavigate} from 'react-router-dom'
function TabView(props){
   let dispatch=useDispatch()
   let navigate=useNavigate()
   const tabViewList=useSelector(state=>state.app.tabViewList)
   const activeTabName=useSelector(state=>state.app.activeTabName)
   
   const delTab=(item)=>{
      dispatch(delTabView(item))
      let tabIndex=tabViewList.length-2>=0?tabViewList.length-2:0
      let lastTabName=tabViewList[tabIndex].name
      dispatch(setActiveTab(lastTabName))
      navigate(lastTabName)
   } 
   const handleTabClick=(item)=>{
       dispatch(setActiveTab(item.name))
       navigate(item.url) 
   }


   let TabViewContent
   if(tabViewList!==undefined && tabViewList.length>0){
      const tabcon=tabViewList.map((item)=><Tabs.Pane key={item.name}  label={<span><span className='tabview-title' onClick={()=>handleTabClick(item)}><Icon src={item.name===activeTabName?"selected":'unselected'}/> {item.title}</span>{item.name===activeTabName?<Icon src='del' className='tabview-del' onClick={()=>delTab(item)}/>:<></>}</span>} name={item.name}></Tabs.Pane>)
      TabViewContent=<><Tabs type="border-card" activeName={activeTabName}>{tabcon}</Tabs><div className='tabview-content'>{props.children}</div></>
   }else{
      TabViewContent=<div className='tabview-normal'>{props.children}</div>
   }
   
   
   const NoTabViewContent=<div className='tabview-normal'>{props.children}</div>

   const finalView=props.isTabView?TabViewContent:NoTabViewContent
   return(
      finalView
   )
}
export default TabView