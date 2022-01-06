import "./index.css"
import {Menu} from 'element-react'
import Icon from 'component/icon'
import {useNavigate} from 'react-router-dom'
import { addTabView,setActiveTab } from "redux/Slices/appSlice"
import {useDispatch,useSelector} from 'react-redux'

export const MenuList=[
    {icon:'home',title:'首页',name:'index',url:'/index',haschildren:false},
    {icon:'power',title:'权限管理',name:'power',url:'/power',haschildren:false},
    {icon:'list',title:'订单列表',name:'orderlist',url:'/orderlist',haschildren:false},
    {icon:'shop',title:'店铺管理',name:'shoplistmenu',url:'/shoplist',haschildren:true,children:[
        {icon:'add',title:'新增店铺',name:'addshop',url:'/addshop',haschildren:false},
        {icon:'list',title:'店铺列表',name:'shoplist',url:'/shoplist',haschildren:false}
    ]},
    {icon:'goods',title:'商品管理',name:'goodslistmenu',url:'/goodslist',haschildren:true,children:[
        {icon:'add',title:'添加商品',name:'editgoods',url:'/editgoods',haschildren:false},
        {icon:'list',title:'商品列表',name:'goodslist',url:'/goodslist',haschildren:false},
        {icon:'class',title:'分类管理',name:'classmanager',url:'/classmanager',haschildren:false}
    ]}
]
function SideNav(){
   const activeTabName=useSelector(state=>state.app.activeTabName) 
   const myPowerList=useSelector(state=>state.user.powerlist)
   const isMenuFolded=useSelector(state=>state.app.isMenuFold)
   
   const getPowerMenu=()=>{
       let myPowerMenu=[]
       for(let i=0;i<MenuList.length;i++){
           if(MenuList[i].haschildren){
               let subcon=JSON.parse(JSON.stringify(MenuList[i]))
               let subMenuList=[]
               for(let j=0;j<MenuList[i].children.length;j++){
                    if(myPowerList.includes(MenuList[i].children[j].name)){
                        subMenuList.push(MenuList[i].children[j])
                    }
               }
               if(subMenuList.length>0){
                  subcon.children=subMenuList
                  myPowerMenu.push(subcon)
               }
           }else{
               if(myPowerList.includes(MenuList[i].name)){
                   myPowerMenu.push(MenuList[i])
               }
           }
       }
       return myPowerMenu
   }

   const myPowerMenuList=getPowerMenu()
   
   let navigate=useNavigate() 
   let dispatch=useDispatch()
   
   const handleClick=(item)=>{
       dispatch(addTabView({name:item.name,url:item.url,title:item.title}))
       dispatch(setActiveTab(item.name))
       navigate(item.url)
   }
   const setActive=(tabname)=>{
       dispatch(setActiveTab(tabname))
   }
   let titleStyle=isMenuFolded?'menutitle hide':'menutitle'
   const menucon=myPowerMenuList.map((item)=>{
        if(item.haschildren){
            let submenucon=item.children.map((child)=><div onClick={()=>handleClick(child)} key={child.name}><Menu.Item index={child.name}><Icon src={child.icon}/><span className={titleStyle}>{child.title}</span></Menu.Item></div>)  
            return(
            <Menu.SubMenu key={item.name} index={item.name} title={<span><Icon src={item.icon}/><span className={titleStyle}>{item.title}</span></span>}>
                {submenucon}
            </Menu.SubMenu>
            )
        }else{
            return (<div onClick={()=>handleClick(item)} key={item.name}><Menu.Item index={item.name} className='mainmenu'><Icon src={item.icon}/><span className={titleStyle}>{item.title}</span></Menu.Item></div>)
        }
   })
   return(
    <div className={isMenuFolded?'app-left-folded':'app-left'}>
        <Menu className="el-menu-vertical-demo" theme="dark" defaultActive={activeTabName} onSelect={(tabindex)=>setActive(tabindex)}>
            {menucon}
        </Menu>
    </div>
    ) 
}

export default SideNav