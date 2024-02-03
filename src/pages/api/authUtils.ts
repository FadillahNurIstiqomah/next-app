import Cookies from 'js-cookie';

export const setAuthToken = (token: string) => {
  Cookies.set('authToken', token);
};

export const removeAuthToken = () => {
  Cookies.remove('authToken');
};

export const setLinkPayment = (payment: string) => {
    Cookies.set('LinkPayment', payment);
};

export const setName = (name: string) => {
    Cookies.set('user name', name);
};