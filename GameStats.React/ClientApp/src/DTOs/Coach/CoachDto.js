export default class CoachDto {
    constructor(options = {}) {
        this.id = options.id || 0;
        this.firstName = options.firstName || '';
        this.lastName = options.lastName || '';
        this.isHeadCoach = options.isHeadCoach;
        this.teamId = options.teamId || 0;

        this.name = `${this.firstName} ${this.lastName}`;
    }

    stringify() {
        return JSON.stringify(this);
    }
}