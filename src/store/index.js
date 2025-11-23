import {createStore} from 'vuex';
import postsData from "@/data/posts.json";

export default createStore({
    state: {
        posts: []
    },
    getters: {
        allPosts: state => state.posts
    },
    mutations: {
        SET_POSTS(state, posts) {
            state.posts = posts
        },
        INCREMENT_LIKES(state, postId) {
            const post = state.posts.find(p => p.id === postId);
            if (post) {
                post.likes++;
            }
        }
    },
    actions: {
        fetchPosts({commit}) {
            commit("SET_POSTS", postsData)
        },
        likePost({commit}, postId) {
            commit("INCREMENT_LIKES", postId)
        }
    },
    modules: {}
})
