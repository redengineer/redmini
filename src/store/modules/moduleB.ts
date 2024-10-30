export default {
  namespaced: true,
  state: () => ({
    name: 'moduleB',
  }),
  getters: {
    computedName: (state: any) => `${state.name} computed`,
  },
  mutations: {
    setName(state: any, payload: string) {
      state.name = payload
    }
  },
  actions: {
    asyncSetName({ commit }: any, payload: string) {
      setTimeout(() => {
        commit('setName', payload)
      }, 2000)
    }
  }
}