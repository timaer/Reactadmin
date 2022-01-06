import Icon from 'component/icon'
import {useSelector,useDispatch} from 'react-redux' 
import{toggleFoldMenu} from 'redux/Slices/appSlice'
function FoldBtn(){
   let dispatch=useDispatch()
   const isMenuFolded=useSelector(state=>state.app.isMenuFold) 
   const changeMenu=()=>{
        dispatch(toggleFoldMenu())
   } 
   return(
      <Icon src={isMenuFolded?'sidebar-open':'sidebar-close'} className='icon' onClick={()=>changeMenu()}/>
   )
}
export default FoldBtn