import axios from 'axios'
import config from 'services/config'

const stats = {}

stats.get = () => axios.get(`${config.BASE_URL}/stats`).then(res => res.data)

export default stats
