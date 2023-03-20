
export const Api_Version = 'v1/';

// export const Url = 'http://172.16.0.55:3000/'
export const URL = 'http://172.16.1.129:3000/'

export const API_URL = URL + Api_Version;

// Auth module
export const USER_SIGNUP = API_URL+'users/signUp';
export const USER_LOGIN = API_URL+'user/login';
export const FORGOTPASSWORD = API_URL+'users/forgot-password';

// Main module -> Admin Module -> Service ->Admin List Service
export const GET_ADMILIST = API_URL+'admin/admin-list';
export const CREATE_ADMIN = API_URL+'admin/create-admin';
export const DELETE_ADMIN = API_URL+'admin/delete-admin/';
export const EDIT_ADMIN = API_URL+'admin/edit-admin/';

// Main module -> Admin Module -> Service ->slider Service
export const ADD_SLIDER = API_URL+'slider/add-slider';
export const GET_SLIDER = API_URL+'slider/get-slider';
export const DELETE_SLIDER = API_URL+'slider/delete-slider/';
export const EDIT_SLIDER = API_URL+'slider/edit-slider/';

// Main module -> Admin Module -> Service ->User Service
export const GET_USERLIST = API_URL+'user/list';


// Feedback-query module
export const FEEBBACK_CREATE = API_URL+'feedback/create';
export const GET_ALLFEEBBACK_LIST = API_URL+'feedback/get-all';
export const CURRENT_USER_FEEBBACK_LIST = API_URL+'feedback/get';
export const UPDATE_FEEDBACK = API_URL+'feedback/update/';
export const DELETE_FEEDBACK = API_URL+'feedback/delete/';

export const FEEDBACK_ASSIGN_LIST = API_URL+'feedback/get-assigned';
export const FEEDBACK_REASSIGN_MEMBERLIST = API_URL+'feedback/get-users/';
export const FEEDBACK_REASSIGN_TO_MEMBER = API_URL+'feedback/re-assign/';





