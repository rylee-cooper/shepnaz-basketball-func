import LeagueDto from './LeagueDto';

export default class TeamListDto {
    constructor(options) {
        this.leagues = options.leagues ? options.leagues.map(x => new LeagueDto(x)) : [];
    }

    stringify() {
        return JSON.stringify(this);
    }
}