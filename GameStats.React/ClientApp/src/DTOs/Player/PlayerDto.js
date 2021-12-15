export default class PlayerDto {
    constructor(options = {}) {
        this.id = options.id || 0;
        this.firstName = options.firstName || '';
        this.lastName = options.lastName || '';
        this.jerseyNumber = options.jerseyNumber;
        this.teamId = options.teamId || 0;
        this.teamName = options.teamName || '';
        this.dateOfBirth = options.dateOfBirth || '';
        this.gender = options.gender || '';

        this.seasonId = options.seasonId || 0;
        this.seasonDescription = options.seasonDescription || '';
        this.leagueId = options.leagueId || 0;
        this.leagueDescription = options.leagueDescription || '';

        this.name = `${this.firstName} ${this.lastName}`;
    }

    stringify() {
        return JSON.stringify(this);
    }
}