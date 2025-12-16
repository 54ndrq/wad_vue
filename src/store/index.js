import {createStore} from 'vuex'

export default createStore({
    state: {
        posts: [],
        token: localStorage.getItem('token') || '',
        authError: null
    },
    getters: {
        allPosts: state => state.posts,
        isAuthenticated: state => !!state.token,
        authError: state => state.authError
    },
    mutations: {
        SET_POSTS(state, posts) {
            state.posts = posts.map(post => ({
                ...post,
                title: post.body || post.title || '', // Map body from API to title for component
                isLiked: false
            }));
        },

        TOGGLE_LIKE_BUTTON(state, postId) {
            const post = state.posts.find(p => p.id === postId);
            if (post) {
                post.isLiked = !post.isLiked;
                if (post.isLiked) {
                    post.likes++;
                } else {
                    post.likes--;
                }
            }
        },

        SET_TOKEN(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        CLEAR_AUTH(state) {
            state.token = '';
            state.posts = [];
            localStorage.removeItem('token');
        },
        SET_ERROR(state, error) {
            state.authError = error;
        }
    },
    actions: {
        async fetchPosts({commit, state}) {
            // Sync token from localStorage if not in state
            const token = state.token || localStorage.getItem('token');
            if (!token) return;

            // If token was in localStorage but not in state, update state
            if (!state.token && token) {
                commit('SET_TOKEN', token);
            }

            try {
                const res = await fetch('http://localhost:3000/posts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!res.ok) throw new Error('Failed to fetch');

                const data = await res.json();
                commit("SET_POSTS", data);
            } catch (err) {
                console.error(err);
                if (err.message.includes('403') || err.message.includes('401')) {
                    commit('CLEAR_AUTH');
                }
            }
        },

        async login({commit}, credentials) {
            try {
                const res = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(credentials)
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Login failed');

                commit('SET_TOKEN', data.token);
                commit('SET_ERROR', null);
                return true;
            } catch (err) {
                commit('SET_ERROR', err.message);
                return false;
            }
        },

        async signup({commit}, credentials) {
            try {
                const res = await fetch('http://localhost:3000/signup', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(credentials)
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Signup failed');

                commit('SET_TOKEN', data.token);
                commit('SET_ERROR', null);
                return true;
            } catch (err) {
                commit('SET_ERROR', err.message);
                return false;
            }
        },

        async deleteAllPosts({state, commit}) {
            try {
                await fetch('http://localhost:3000/posts', {
                    method: 'DELETE',
                    headers: {'Authorization': `Bearer ${state.token}`}
                });
                commit("SET_POSTS", []);
            } catch (err) {
                console.error(err);
            }
        },

        async addPost({state, dispatch}, bodyText) {
            try {
                const res = await fetch('http://localhost:3000/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${state.token}`
                    },
                    body: JSON.stringify({body: bodyText})
                });
                if (res.ok) {
                    dispatch('fetchPosts');
                }
            } catch (err) {
                console.error(err);
            }
        },
        async updatePost({state, dispatch}, {id, body}) {
            try {
                const res = await fetch(`http://localhost:3000/posts/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${state.token}`
                    },
                    body: JSON.stringify({body: body})
                });

                if (res.ok) {
                    dispatch('fetchPosts');
                }
            } catch (err) {
                console.error(err);
            }
        },

        async deletePost({state, dispatch}, id) {
            try {
                const res = await fetch(`http://localhost:3000/posts/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${state.token}`
                    }
                });

                if (res.ok) {
                    dispatch('fetchPosts');
                }
            } catch (err) {
                console.error(err);
            }
        },

        toggleLike({commit}, postId) {
            commit("TOGGLE_LIKE_BUTTON", postId)
        },

        logout({commit}) {
            commit('CLEAR_AUTH');
        }
    },
    modules: {}
})
