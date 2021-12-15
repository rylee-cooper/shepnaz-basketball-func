import TeamDto from './TeamDto';

export default class TeamListDto {
    constructor(options) {
        this.teams = options.teams ? options.teams.map(x => new TeamDto(x)) : [];
    }

    stringify() {
        return JSON.stringify(this);
    }
}