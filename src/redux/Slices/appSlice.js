import { createSlice,current } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    isTabView:true,
    loading: false,
    tabViewList:[],
    activeTabName:'',
    isMenuFold:false
  },
  reducers: {
    setIsTabView:(state,action)=>{
       state.isTabView=action.payload
    },
    setLoading: (state,action) => {
      state.loading = action.payload;
    },
    addTabView:(state,action)=>{
      const tabviews=current(state.tabViewList)
      if(tabviews.find((item)=>item.name===action.payload.name)===undefined){
         state.tabViewList.push(action.payload)
      }
    },
    delTabView:(state,action)=>{
      const tabviews=current(state.tabViewList)
      if(tabviews.length>1){
         state.tabViewList=tabviews.filter((item)=>item.name!==action.payload.name)
      }
    },
    setActiveTab:(state,action)=>{
      state.activeTabName=action.payload
    },
    toggleFoldMenu:state=>{
      state.isMenuFold=!state.isMenuFold
    },
    emptyTabView:state=>{
      state.loading=false
      state.tabViewList=[]
      state.activeTabName=''
    }
  }
});

export const { setLoading,addTabView,delTabView,setActiveTab,emptyTabView,setIsTabView,toggleFoldMenu} = appSlice.actions
export default appSlice.reducer