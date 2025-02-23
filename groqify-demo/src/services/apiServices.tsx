import axios from 'axios';

const getAIChat = (userMessage: string) => {
    return axios.post(`${__API_PATH__}/chat`, {
        message: userMessage,
    });
};

const getLessonList = () => {
    return axios.get(`${__API_PATH__}/lessons-list`);
};

const getLessonCompletion = () => {
    return axios.get(`${__API_PATH__}/lessons-list/completed`);
};

const getModuleList = () => {
    return axios.get(`${__API_PATH__}/modules-list`);
};

export { getAIChat, getLessonList, getLessonCompletion, getModuleList };
