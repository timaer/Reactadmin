import './index.css'
import {Breadcrumb} from 'element-react'
import {useLocation} from 'react-router-dom'
import {MenuList} from 'component/sidenav'
function BreadNav(props){
  
   const FindBreadCrumb=()=>{
     let currentPath=useLocation().pathname
     let BreadPathString=[]
     for(let i=0;i<MenuList.length;i++){
          if(MenuList[i].url===currentPath){
               BreadPathString.push(MenuList[i].title);
               break;
          }
          if(MenuList[i].haschildren){  
             for(let j=0;j<MenuList[i].children.length;j++){
                  if(MenuList[i].children[j].url===currentPath){
                    BreadPathString.push(MenuList[i].title)
                    BreadPathString.push(MenuList[i].children[j].title)
                    break;
                  }
             }  
          }
     }
     return BreadPathString
   }

   const BreadCrumbArr=FindBreadCrumb()
   const desktop_bread_items=BreadCrumbArr.map((item)=><Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>)
   const desktop_bread=<Breadcrumb separator=">">{desktop_bread_items}</Breadcrumb>
   const mobile_bread=<></>

   const breadcon=props.isshow?desktop_bread:mobile_bread
   return(
        breadcon
   )
}

export default BreadNav