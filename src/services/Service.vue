<script>
    import axios from 'axios'
    import { mapGetters } from 'vuex'
    import { store } from '../store/index'
    import Notifications from '@/services/Notifications'

    export default {
        components: {
            Notifications
        },
        data() {
            return {
                api: 'http://45.76.90.178:2222/api/v1/',
            }
        },
        computed: {
            ...mapGetters([
                'token'
            ])
        },
        methods: {
            headers() {
                if (store.state.user.token) {
                    return {
                        headers: {
                            'Authorization': `Token ${store.state.user.token}`
                        }
                    }
                } else {
                    return {}
                }
            },
            get(route) {
                return axios.get(`http://45.76.90.178:2222/api/v1/${route}`, this.headers())
            },
            post(route, data) {
                return axios.post(`http://45.76.90.178:2222/api/v1/${route}`, data, this.headers())
            },
            put(route, data) {
                return axios.put(`http://45.76.90.178:2222/api/v1/${route}`, data, this.headers())
            },
            delete(route) {
                return axios.delete(`http://45.76.90.178:2222/api/v1/${route}`, this.headers())
            }
        }
    }
</script>