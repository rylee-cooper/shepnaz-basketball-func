import CoachDto from '../Coach/CoachDto';
import PlayerDto from '../Player/PlayerDto';

export default class TeamDto {
    constructor(options = {}) {
        this.id = options.id || 0;
        this.name = options.name || '';
        this.leagueId = options.leagueId || 0;
        this.seasonId = options.seasonId || 0;
        this.leagueDescription = options.leagueDescription || '';
        this.seasonDescription = options.seasonDescription || '';

        this.coaches = options.coaches ? options.coaches.map(x => new CoachDto(x)) : [];
        this.players = options.players ? options.players.map(x => new PlayerDto(x)) : [];
    }

    stringify() {
        return JSON.stringify(this);
    }
}