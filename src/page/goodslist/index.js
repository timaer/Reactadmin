import './index.scss'
import {Input,Button,Select,Table,Pagination} from 'element-react'
import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
function GoodsList(){
    let navigate=useNavigate()
    const [classid,setclassid]=useState('')
    const [keywords,setkeywords]=useState('')
    const [pageInfo,setPageInfo]=useState({pageindex:1,pagesize:10,total:0})
    const [goodslist,setgoodslist]=useState([])
    const [goodsclass,setgoodsclass]=useState([])
    const doSearch=()=>{
       getList({pageindex:1,pagesize:pageInfo.pagesize,total:pageInfo.total})
    }

    const getList=(pageInfo)=>{
       window.$post("/goods/getGoodsList",{pageinfo:pageInfo,classid:classid,keywords:keywords}).then((data)=>{
           if(data.result.success){
               setgoodslist(data.result.info.goodslist)
               setgoodsclass(data.result.info.goodsclass)
               setPageInfo(data.result.info.pageinfo)
           }else{
              window.$msg(data.result.info)
           }
       })
    }
    const fetchPageData=(index)=>{
       getList({pageindex:index,pagesize:pageInfo.pagesize,total:pageInfo.total})
    }

    useEffect(()=>{
       getList(pageInfo)  
        // eslint-disable-next-line  
    },[])

    const editGoods=(item)=>{
        navigate("/editgoods/"+item.id)
    }

    const delGoods=(item)=>{
        window.$post("/goods/delGoods",{goodsid:item.id}).then((data)=>{
            if(data.result.success){
                window.$msg(data.result.info,'success')
                getList({pageindex:1,pagesize:10,total:0})
            }else{
                window.$msg(data.result.info)
            }
        })
    }
    const columns=[
        {
          label:'缩略图',
          prop:'headimg',
          render:(item)=>{
             return <img src={item.headimg} alt='pic' className='headimg'/> 
          }
        },
        {
           label:'名称',
           prop:'name'
        },
        {
            label:'所在店铺',
            prop:'shopname'
        },
        {
            label:'描述',
            prop:'desc'
        },
        {
            label:'价格',
            prop:'price'
        },{
            label:'库存',
            prop:'stock'
        },{
            label:'创建时间',
            prop:'createtime',
            render:(item)=>{
               return window.$timeToDate(item.createtime)
            }
        },{
            label:'操作',
            render:(item)=>{
              return (
                <Button.Group>
                  <Button type="primary" onClick={()=>editGoods(item)}>编辑</Button>
                  <Button type="danger" onClick={()=>delGoods(item)}>删除</Button>
                 </Button.Group>
              )
            }
        }
    ]

    return(
        <div id='goodslist'>
            <div className='search'>
            <Input placeholder="请输入搜索关键字" prepend={
                <Select value={classid} onChange={(value)=>setclassid(value)}>
                {
                    goodsclass.map((item) => <Select.Option key={item.id} label={item.name} value={item.id} />)
                }
                </Select>
            } append={<Button type="primary" icon="search" onClick={()=>doSearch()}>搜索</Button>}  onChange={(value)=>setkeywords(value)}/>
            </div>
            <Table
                style={{width: '100%'}}
                columns={columns}
                data={goodslist}
                stripe={true}
                />
            <div className='pagination'>  
                <Pagination layout="prev, pager, next" total={pageInfo.total} pageSize={pageInfo.pagesize} onCurrentChange={(e)=>fetchPageData(e)}/>
            </div> 
        </div>
    )
}
export default GoodsList