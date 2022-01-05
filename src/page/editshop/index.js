import {Form,Input,Button,Upload,Dialog} from 'element-react'
import {useState,useEffect,useRef} from 'react'
import {useParams,useNavigate} from 'react-router-dom'

function EditShop(){
    let navigate=useNavigate()
    
    const {id}=useParams()
    const [name,setname]=useState('')
    const [desc,setdesc]=useState('')
    const [intro,setintro]=useState('')
    
    const [address,setaddress]=useState('')
    const [opentime,setopentime]=useState(false)
    const [business,setbusiness]=useState([])
    const [headimg,setheadimg]=useState('')
    const [hotbg,sethotbg]=useState('')
    const [logo,setlogo]=useState('')
    const [slides,setslides]=useState([])

    const [magpicVisible,setmagpicvisible]=useState(false)
    const [magpicurl,setmagpicurl]=useState('')
    const [uploadcon,setuploadcon]=useState(null)

    const refHeadImg=useRef(null)
    const refSlides=useRef(null)
    const refLogo=useRef(null)
    const refHotbg=useRef(null)

    const clearImgCache=()=>{
        refLogo.current && refLogo.current.clearFiles()
        refHotbg.current && refHotbg.current.clearFiles()
        refHeadImg.current && refHeadImg.current.clearFiles()
        refSlides.current && refSlides.current.clearFiles()
    }
    useEffect(()=>{
        if(id!==undefined && id>0){
            window.$post('/shop/getShopInfo',{shopid:id}).then((data)=>{
                if(data.result.success){
                    let initData=data.result.info
                    const filelist=initData.filelist
                    let uploadcontent=(  //由于react element没有自动刷新fileList ，只能在这里一次性设置
                      <> 
                      <Form.Item label='Logo图'>
                         <Upload
                             name='image'
                             action={process.env.REACT_APP_IMG_UPLOAD_URL}
                             listType="picture-card"
                             onPreview={file => handlePreview(file)}
                             onRemove={(file, fileList) => handleRemove(file, fileList)}
                             limit={1}
                             onExceed={()=>window.$msg('超出最大上传数')}
                             onSuccess={(response,file,fileList)=>handleUploadOk(response,file,fileList,'logo')}	
                             fileList={filelist['logo']}
                             ref={refLogo}
                         >
                            <i className="el-icon-plus"></i>
                         </Upload>
                     </Form.Item>      
                       <Form.Item label='缩略图'>
                         <Upload
                             name='image'
                             action={process.env.REACT_APP_IMG_UPLOAD_URL}
                             listType="picture-card"
                             onPreview={file => handlePreview(file)}
                             onRemove={(file, fileList) => handleRemove(file, fileList)}
                             limit={1}
                             onExceed={()=>window.$msg('超出最大上传数')}
                             onSuccess={(response,file,fileList)=>handleUploadOk(response,file,fileList,'headimg')}	
                             fileList={filelist['headimg']}
                             ref={refHeadImg}
                         >
                            <i className="el-icon-plus"></i>
                         </Upload>
                     </Form.Item>
                     <Form.Item label='推荐背景'>
                         <Upload
                             name='image'
                             action={process.env.REACT_APP_IMG_UPLOAD_URL}
                             listType="picture-card"
                             onPreview={file => handlePreview(file)}
                             onRemove={(file, fileList) => handleRemove(file, fileList)}
                             limit={1}
                             onExceed={()=>window.$msg('超出最大上传数')}
                             onSuccess={(response,file,fileList)=>handleUploadOk(response,file,fileList,'hotbg')}	
                             fileList={filelist['hotbg']}
                             ref={refHotbg}
                         >
                            <i className="el-icon-plus"></i>
                         </Upload>
                     </Form.Item>
                     <Form.Item label='轮播图'>
                         <Upload
                             name='image'
                             action={process.env.REACT_APP_IMG_UPLOAD_URL}
                             listType="picture-card"
                             onPreview={file =>handlePreview(file)}
                             onRemove={(file, fileList) =>handleRemove(file, fileList)}
                             onSuccess={(response,file,fileList)=>handleUploadOk(response,file,fileList,'slides')}	
                             fileList={filelist['slides']}
                             ref={refSlides}
                         >
                           <i className="el-icon-plus"></i>
                         </Upload>
                     </Form.Item>
                     </>
                    )
                     setuploadcon(uploadcontent)
                     setname(initData.shopinfo.name)
                     setdesc(initData.shopinfo.desc)
                     setintro(initData.shopinfo.intro)
                     sethotbg(initData.shopinfo.hotbg)
                     setlogo(initData.shopinfo.logo)
                     setbusiness(initData.shopinfo.business)
                     setaddress(initData.shopinfo.address)
                     setopentime(initData.shopinfo.opentime)
                     setheadimg(initData.shopinfo.headimg)
                     setslides(initData.shopinfo.slides)
                }else{
                    window.$msg(data.result.info)
                }
             })
        }else{
            clearImgCache()
            let uploadcontent=(  
                <>       
                <Form.Item label='Logo图'>
                         <Upload
                             name='image'
                             action={process.env.REACT_APP_IMG_UPLOAD_URL}
                             listType="picture-card"
                             onPreview={file => handlePreview(file)}
                             onRemove={(file, fileList) => handleRemove(file, fileList)}
                             limit={1}
                             onExceed={()=>window.$msg('超出最大上传数')}
                             onSuccess={(response,file,fileList)=>handleUploadOk(response,file,fileList,'logo')}	
                             ref={refLogo}
                         >
                            <i className="el-icon-plus"></i>
                         </Upload>
                     </Form.Item>    
                 <Form.Item label='缩略图'>
                   <Upload
                       name='image'
                       action={process.env.REACT_APP_IMG_UPLOAD_URL}
                       listType="picture-card"
                       onPreview={file => handlePreview(file)}
                       onRemove={(file, fileList) => handleRemove(file, fileList)}
                       limit={1}
                       onExceed={()=>window.$msg('超出最大上传数')}
                       onSuccess={(response,file,fileList)=>handleUploadOk(response,file,fileList,'headimg')}
                       ref={refHeadImg}
                   >
                      <i className="el-icon-plus"></i>
                   </Upload>
               </Form.Item>
               <Form.Item label='推荐背景'>
                         <Upload
                             name='image'
                             action={process.env.REACT_APP_IMG_UPLOAD_URL}
                             listType="picture-card"
                             onPreview={file => handlePreview(file)}
                             onRemove={(file, fileList) => handleRemove(file, fileList)}
                             limit={1}
                             onExceed={()=>window.$msg('超出最大上传数')}
                             onSuccess={(response,file,fileList)=>handleUploadOk(response,file,fileList,'hotbg')}	
                             ref={refHotbg}
                         >
                            <i className="el-icon-plus"></i>
                         </Upload>
                     </Form.Item>
               <Form.Item label='轮播图'>
                   <Upload
                       name='image'
                       action={process.env.REACT_APP_IMG_UPLOAD_URL}
                       listType="picture-card"
                       onPreview={file =>handlePreview(file)}
                       onRemove={(file, fileList) =>handleRemove(file, fileList)}
                       onSuccess={(response,file,fileList)=>handleUploadOk(response,file,fileList,'slides')}
                       ref={refSlides}			
                   >
                     <i className="el-icon-plus"></i>
                   </Upload>
               </Form.Item>
               </>
              )
            setuploadcon(uploadcontent)
            setname("")
            setdesc("")
            setintro("")
            sethotbg("")
            setlogo("")
            setaddress("")
            setopentime("")
            setheadimg("")
            setbusiness("")
            setslides("")
        }
         
    },[id])

    const saveShop=()=>{
       
        if(name===''||desc===''||intro===''||hotbg===''||address===''||opentime===''||business===''||logo===''||headimg===''||slides.length<=0){
            window.$msg('你有表单项没有填全，请核查','error');
            return false;
        }
        let shopinfo={}
        shopinfo.id=id===undefined?0:id
        shopinfo.name=name
        shopinfo.desc=desc
        shopinfo.intro=intro
        shopinfo.hotbg=hotbg
        shopinfo.address=address
        shopinfo.opentime=opentime
        shopinfo.business=business
        shopinfo.headimg=headimg
        shopinfo.slides=slides
        shopinfo.logo=logo

            window.$post('/shop/saveShop',{shopinfo:shopinfo}).then((data)=>{
                if(data.result.success){
                    window.$msg(data.result.info,'success')
                    setTimeout(()=>{navigate('/shoplist')},500)
                }else{
                    window.$msg(data.result.info)
                }
            })
    }

    const handlePreview=(file)=>{
        setmagpicurl(file.url)
        setmagpicvisible(true)
    }

    const handleRemove=(file,fileList)=>{
        console.log(file, fileList);
    }

    const handleUploadOk=(data,file,fileList,type)=>{
       if(type==='headimg'){
          setheadimg(data.result.info.url)
       }else if(type==='logo'){
          setlogo(data.result.info.url)
       }else if(type==='hotbg'){
          sethotbg(data.result.info.url)
       }else if(type==='slides'){
          let imgslides=fileList.map((item)=>item.response.result.info.url)
          setslides(imgslides)
       }  
    }
    return(
        <div id='editgoods'>
            <Form labelWidth="80">
                <Form.Item label="店铺名称">
                    <Input value={name} onChange={(value)=>setname(value)}></Input>
                </Form.Item>
                <Form.Item label="店铺简介">
                    <Input type="textarea" value={desc} onChange={(value)=>setdesc(value)}></Input>
                </Form.Item>
                <Form.Item label="店铺描述">
                    <Input value={intro} onChange={(value)=>setintro(value)}></Input>
                </Form.Item>
                <Form.Item label="店铺地址">
                    <Input value={address} onChange={(value)=>setaddress(value)}></Input>
                </Form.Item>
                <Form.Item label="营业时间">
                    <Input value={opentime} onChange={(value)=>setopentime(value)}></Input>
                </Form.Item>
                <Form.Item label="经营范围">
                    <Input value={business} onChange={(value)=>setbusiness(value)}></Input>
                </Form.Item>
                {uploadcon}
                <Form.Item>
                    <Button type="primary" onClick={()=>saveShop()}>立即保存</Button>
                    <Button onClick={()=>navigate(-1)}>取消</Button>
                </Form.Item>
                <Dialog
                        visible={magpicVisible}
                        size="tiny"
                        onCancel={()=>setmagpicvisible(false)}
                        >
                        <img width="100%" src={magpicurl} alt="" />
                </Dialog>
                </Form>
        </div>
    )
}
export default EditShop