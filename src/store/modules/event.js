import EventService from '@/services/EventService.js'
// can opt to just export a single object as opposed to constants without the benefit of private variables & methods

export const namespaced = true // mutations, actions & getters will be namespaced under 'event'

export const state = {
  count: 0,
  totalEvents: 0,
  events: [],
  event: {},
  todos: [
    { id: 1, text: '...', done: false },
    { id: 2, text: '...', done: true },
    { id: 3, text: '...', done: false },
    { id: 4, text: '...', done: true }
  ]
}

export const mutations = {
  INCREMENT_COUNT: (state, value) => {
    return (state.count += value)
  },
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_TOTAL_EVENTS(state, total) {
    state.totalEvents = total
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}

// Mutations should only be called from Actions inside the current Module, not from other Vuex Modules
// dispatch('moduleName/actionToCall', null,{root:true}) - if using namespace, if no payload put null
export const actions = {
  // when api call responds, call ADD_EVENT mutation
  createEvent({ commit, dispatch, rootState }, event) {
    console.log('User creating Event is ' + rootState.user.user.name) // rootState to get base state
    //dispatch('actionToCall') // Actions, Mutations, Getters are registered under global numespace (aka root), no need to call with their module name
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Your event has been created! ' + event.id
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(err => {
        const notification = {
          type: 'error',
          message:
            'There was a problem creating events ' + err.id + ' ' + err.message
        }
        dispatch('notification/add', notification, { root: true })
        throw err //propagate error to our component
      })
  },
  // the payload in actions & mutations can be a variable or an object
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(res => {
        commit('SET_TOTAL_EVENTS', res.headers['x-total-count'])
        commit('SET_EVENTS', res.data)
      })
      .catch(err => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + err.message
        }
        dispatch('notification/add', notification, { root: true }) // allows dispatcher to go to the route state, find notification module & call the add action
      })
  },
  // if we already have this event, just set it don't make another api call since we already got it under EventList
  fetchEvent({ commit, getters, dispatch }, id) {
    let event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then(res => commit('SET_EVENT', res.data))
        .catch(err => {
          const notification = {
            type: 'error',
            message:
              'There was a problem fetching event: ' + id + ' ' + err.message
          }
          dispatch('notification/delete', notification, { root: true })
        })
    }
  },
  updateCount({ state, commit }, value) {
    if (state.user) {
      commit('INCREMENT_COUNT', value)
    }
  }
}

export const getters = {
  //dynamic getters, takes in "state" which returns another function with "id"
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
