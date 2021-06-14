import axios from 'axios';
import { Item } from '../models/menu';

const instance = axios.create({
    headers: {
        'content-type': 'application/json',
    }
});

instance.interceptors.response.use(
    res => res,
    err => {
        throw new Error(err.response.data.message);
    }
);

const api = {
    getMenuItems:   () =>
                    instance({
                        'method':          'GET',
                        'url':             `/menuItem`      
                    }),
    addMenuItem:    (item: Item) =>
                    instance({
                        'method':          'POST',
                        'url':             `/menuItem`,
                        data:              {
                            item
                        }
                    }),
    updateMenuItem:    (item: Item) =>
                    instance({
                        'method':          'POST',
                        'url':             `/menuItem`,
                        data:              {
                            item
                        }
                    }),
    deleteMenuItem: (id: String) =>
                    instance({
                        'method':          'DELETE',
                        'url':             `/menuItem/${id}`,
                        data:              {
                            todoId: id
                        }
                    })
}

export default api;
