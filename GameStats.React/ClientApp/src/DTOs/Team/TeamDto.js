export default class TeamDto {
    constructor(options = {}) {
        this.id = options.id || 0;
        this.name = options.name || '';
        this.leagueId = options.leagueId || 0;
        this.seasonId = options.seasonId || 0;
        this.leagueDescription = options.leagueDescription || '';
        this.seasonDescription = options.seasonDescription || '';
        
    }

    stringify() {
        return JSON.stringify(this);
    }
}