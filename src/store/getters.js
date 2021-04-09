const getters = {
 
  token: state => state.user.token,
  rankingData: state => state.app.rankingData,
  weatherobj: state => state.app.weatherobj,
  
}
export default getters