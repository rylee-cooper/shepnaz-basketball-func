export default class SeasonDto {
    constructor(options = {}) {
        this.id = options.id || 0;
        this.description = options.description || '';
        this.startDate = options.startDate || '';
        this.endDate = options.endDate || '';
        this.isCurrentSeason = options.isCurrentSeason;
    }

    stringify() {
        return JSON.stringify(this);
    }
}