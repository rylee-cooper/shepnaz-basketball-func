import TeamListDto from '../../DTOs/Team/TeamListDto';
import TeamDto from '../../DTOs/Team/TeamDto';

import PlayerDto from '../../DTOs/Player/PlayerDto';
import PlayerListDto from '../../DTOs/Player/PlayerListDto';

import LeagueListDto from '../../DTOs/League/LeagueListDto';
import SeasonListDto from '../../DTOs/Season/SeasonListDto';
import GenderListDto from '../../DTOs/Gender/GenderListDto';

const apiUrl = process.env.REACT_APP_API_URL + 'api';

/**
 * Makes a request to the API and returns the data as a JSON object (Same as calling response.json())
 * 
 * @private
 * @param {String} url - The relative url
 * @param {Object} requestOptions - Any request options optional
 * @returns {Promise<Object>} - The object returned from the api call or an empty object if the api call returns nothing
 */
const apiCall = (url, requestOptions) => {
    return send(url, requestOptions)
        .then(response => response.text()
            .then(text => text.length > 0 ? JSON.parse(text) : {}));
}

/**
 * Private helper method for sending a request to the API.
 * 
 * @private
 * @param {String} url - the url endpoint
 * @param {Object} requestOptions - Any other options to send with the request. (ex. body)
 * 
 * @returns {Promise<Response>} A promise object which resolves with the response of the request.
 */
const send = async function (url, requestOptions) {
    const fullUrl = `${apiUrl}/${url}`;
    return fetch(fullUrl, { headers: { 'Content-Type': 'application/json' }, ...requestOptions })
        .then(response => {

            if (response.status >= 400 && response.status < 600) {

                switch (response.status) {
                case 400:
                case 401:
                case 404:
                case 500:
                    return response.json().then(err => {
                        throw new Error(`${err.message ? err.message : JSON.stringify(err)}`);
                    });
                default:
                    throw new Error(`Http ${response.status}`);
                }
            }

            return response;
        })
        .catch(err => {
            console.log(`Error attempting to call api with url ${url}: ${err}`);
            throw err;
        });
}

/*
 * Object containing functions for requesting and submitting data to the API
 */
export default {
    //********* Teams api calls **************
    async getTeams() {
        const url = 'Team';
        let response = await apiCall(url);
        return new TeamListDto(response);
    },

    async getTeam(id) {
        const url = `Team/${id}`;
        let response = await apiCall(url);
        return new TeamDto(response);
    },

    async addTeam(dto) {
        const url = 'Team/Add';
        let response = await apiCall(url, { method: 'POST', body: dto.stringify() });
        return new TeamDto(response);
    },

    async editTeam(dto) {
        const url = 'Team/Edit';
        let response = await apiCall(url, { method: 'PUT', body: dto.stringify() });
        return new TeamDto(response);
    },
    //*****************************************

    //********* Player api calls **************
    async getPlayers() {
        const url = 'Player';
        let response = await apiCall(url);
        return new PlayerListDto(response);
    },

    async getPlayer(id) {
        const url = `Player/${id}`;
        let response = await apiCall(url);
        return new PlayerDto(response);
    },

    async getPlayersByTeam(id) {
        const url = `Player/Team/${id}`;
        let response = await apiCall(url);
        return new PlayerListDto(response);
    },

    async addPlayer(dto) {
        const url = 'Player/Add';
        let response = await apiCall(url, { method: 'POST', body: dto.stringify() });
        return new PlayerDto(response);
    },

    async editPlayer(dto) {
        const url = 'Player/Edit';
        let response = await apiCall(url, { method: 'PUT', body: dto.stringify() });
        return new PlayerDto(response);
    },
    //*****************************************

    //********* Leagues api calls **************
    async getLeagues() {
        const url = 'League';
        let response = await apiCall(url);
        return new LeagueListDto(response);
    },
    //*****************************************

    //********* Seasons api calls **************
    async getSeasons() {
        const url = 'Season';
        let response = await apiCall(url);
        return new SeasonListDto(response);
    },
    //*****************************************

    //********* Coach api calls **************
    async getCoachesByTeam(id) {
        const url = `Coach/Team/${id}`;
        let response = await apiCall(url);
        return new PlayerListDto(response);
    },
    //*****************************************

    //********* Genders api calls **************
    async getGenders() {
        const url = 'Gender';
        let response = await apiCall(url);
        return new GenderListDto(response);
    },
    //*****************************************
}