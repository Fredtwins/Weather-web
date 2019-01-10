import * as types from './mutation-types';

const mutations = {
    [types.SET_SITETAB](state, obj) {
        state.SiteTab = obj
    },
    [types.SET_DATETIMEVAL](state, str) {
        console.log(str)
        state.DateTimeVal = str
    }
}

export default mutations