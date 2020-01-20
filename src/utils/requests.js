import axios from 'axios';

const baseUrl = partialUrl => `https://challenge-dot-popsure-204813.appspot.com${partialUrl}`;

export function sendQuestionnaire(data) {
    return axios.post(baseUrl`/user`, data);
}

export function getRecommendation() {
    return axios.get(baseUrl`/recommendation`, {});
}

