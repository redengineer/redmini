export default {
  namespaced: true,
  state: () => ({
    name: 'moduleA',
    loading: false,
  }),
  getters: {
    computedName: (state: any) => `${state.name} computed`,
  },
  mutations: {
    setName(state: any, payload: string) {
      state.name = payload
    },
    setLoading(state: any, payload: boolean) {
      state.loading = payload
    }
  },
  actions: {
    asyncSetName({ commit }: any, payload: string) {
      commit('setLoading', true)
      setTimeout(() => {
        commit('setName', payload)
        commit('setLoading', false)
      }, 2000)
    }
  }
}