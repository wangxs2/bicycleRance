const app = {
  state: {
    // docHeight: $(document).height() - 180, //文档高度
    menuFlag: false, //左侧菜单的开关
    rankingData:[
      
    ],
    weatherobj:{},
    
  },
  mutations: {
    SET_FLAG: (state) => { //菜单收缩
      state.menuFlag = !state.menuFlag
    },
    SET_RANK:(state,rankingData)=>{
      state.rankingData = rankingData
    },
    SET_WEATER:(state,weatherobj)=>{
      state.weatherobj = weatherobj
    }
    // SET_HEIGHT: (state, docHeight) => { //文档高度
    //   state.docHeight = docHeight
    // }
  }
}
export default app
