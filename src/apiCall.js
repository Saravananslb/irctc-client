import Cookies from 'universal-cookie';
import axios from 'axios';

export const cookie = new Cookies();
axios.defaults.baseURL = 'http://localhost:8000/api/v1';

export const signUpUser = async(user) => {
    return await axios.post('/auth/signup', user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const signInUser = async(user) => {
    return await axios.post('/auth/signin', user, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const validateUser = async() => {
    return await axios.get(`/auth/validate`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: cookie.get('Authorization')
        }
    });
}

export const getLocations = async(loc) => {
    return await axios.get(`/tickets/location?search=${loc}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const getTrains = async(queryString) => {
    return await axios.get(`/tickets/trains?${queryString}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const getBookings = async() => {
    return await axios.get(`/tickets/bookings`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.get('Authorization')
        }
    });
}

export const bookTicket = async(ticket) => {
    return await axios.post(`/tickets/book`, ticket, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.get('Authorization')
        }
    });
}

