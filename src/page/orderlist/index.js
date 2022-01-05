import './index.scss'
import {Input , Button, Select,Table,Pagination,Badge,Tag ,Dialog,Card} from  'element-react'
import {useState,useEffect} from 'react'
function Orderlist(){
    const [orderList,setOrderList]=useState([])
    const [pageInfo,setPageInfo]=useState({pageindex:1,pagesize:15,total:0})
    const [type,settype]=useState('')
    const [keywords,setkeywords]=useState('')
    const [diagVisible,setDiagVisible]=useState(false)
    const [orderInfo,setOrderInfo]=useState(null)

    const getList=(pageinfo)=>{
      window.$post("/order/getOrderList",{pageinfo:pageinfo,type:type,keywords:keywords}).then((data)=>{
        if(data.result.success){
            setPageInfo(data.result.info.pageinfo)
            setOrderList(data.result.info.orderlist)
        }else{
            window.$msg(data.result.info)
        }
     })
    }
    useEffect(()=>{
       getList(pageInfo)
       // eslint-disable-next-line
    },[])
    const columns= [
        {
          label: "下单时间",
          render:(item)=>{
             return window.$timeToDate(item.createtime)
          }
        },
        {
          label: "订单号",
          prop: "ordernum"
        },
        {
          label: "订单号",
          prop: "ordernum",
          render:(item)=>{
             const ordergoodscon=item.ordergoods.map((item)=>{
               return (
                 <div key={item.name}>{item.name}x<Badge value={item.nums } /></div>
               )
             })
             return ordergoodscon
          }
        },
        {
          label: "收货人",
          prop: "name"
        },
        {
          label: "总金额",
          prop: "realmoney"
        },
        {
          label: "状态",
          render:(item)=>{
             return toStatusContent(item.status)
          }
        },
        {
          label: "操作",
          render:(item)=>{
             return  <Button onClick={()=>lookDetail(item)}>查看详情</Button>
          }
        }
      ]
    const lookDetail=(orderItem)=>{
      const orderDetail=orderItem
      let ordergoodscon=orderDetail.ordergoods.map((item)=>{
        return(
               <div key={item.name}>
                    {item.name}x<Badge value={item.nums} className="item"></Badge>
                </div> 
        )
      })
      setDiagVisible(true)

      const orderDetailCon=(
            <ul className='order-detail'>
            <li>订单号：{orderDetail.ordernum}</li>
            <li>订货商品：
               {ordergoodscon}
            </li>
            <li>订单总额：{orderDetail.totalmoney}</li>
            <li>订单优惠：{orderDetail.discountmoney}</li>
            <li>订单实付：{orderDetail.realmoney}</li>
            <li>支付方式：{toPayContent(orderDetail.paytype)}</li>
            <li>订单状态：{toStatusContent(orderDetail.status)}</li>
            <li>收货人：{orderDetail.name}</li>
            <li>收货电话：{orderDetail.mobile}</li>
            <li>收货地址：{orderDetail.province+orderDetail.city+orderDetail.county}</li>
          </ul>  
      )
      setOrderInfo(orderDetailCon)
    }
   
    const toPayContent=(paytype)=>{
        if(paytype===1){
          return '支付宝'
        }else if(paytype===2){
          return '微信'
        }else {
          return '未知'
        }
    }

    const toStatusContent=(status)=>{
        if(status===1){
          return <Tag type="danger">待付款</Tag>
        }else if(status===2){
          return <Tag type="primary">已支付</Tag>
        }else if(status===3){
          return <Tag type="success">已完成</Tag>
        }else{
          return <Tag>未知状态</Tag>
        }
    }
    const doSearch=()=>{
       getList({pageindex:1,pagesize:pageInfo.pagesize,total:pageInfo.total})
    }  
    const fetchPageData=(index)=>{
       getList({pageindex:index,pagesize:pageInfo.pagesize,total:pageInfo.total})
    }
    return(
        <div id='orderlist'>
            <div className='search'>
            <Input placeholder="请输入内容" prepend={
                <Select value={type} onChange={(value)=>settype(value)}>
                {
                    ['订单号', '收货人', '收货电话'].map((item, index) => <Select.Option key={index} label={item} value={index+1} />)
                }
                </Select>
            } append={<Button type="primary" icon="search" onClick={()=>doSearch()}>搜索</Button>}  onChange={(value)=>setkeywords(value)}/>
            </div>
            <Table
                style={{width: '100%'}}
                columns={columns}
                data={orderList}
                stripe={true}
                />
            <div className='pagination'>  
                <Pagination layout="prev, pager, next" total={pageInfo.total} pageSize={pageInfo.pagesize} onCurrentChange={(e)=>fetchPageData(e)}/>
            </div> 

             <Dialog
                title="订单详情"
                visible={diagVisible}
                onCancel={()=>setDiagVisible(false)}
              >
                <Dialog.Body>
                      <Card
                      className="box-card"
                      >
                     <div>
                         {orderInfo}
                    </div>
                  </Card>
                </Dialog.Body>

                <Dialog.Footer className="dialog-footer">
                  <Button onClick={ ()=>setDiagVisible(false)}>取 消</Button>
                  <Button type="primary" onClick={()=>setDiagVisible(false)}>确 定</Button>
                </Dialog.Footer>
              </Dialog> 
        </div>
    )
}

export default Orderlist