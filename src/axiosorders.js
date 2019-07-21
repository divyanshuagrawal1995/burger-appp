import axios from 'axios';
const instances=axios.create({
    baseURL:'https://burger-project-8de59.firebaseio.com/'
})
export default instances;