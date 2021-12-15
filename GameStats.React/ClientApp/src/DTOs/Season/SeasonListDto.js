import SeasonDto from './SeasonDto';

export default class SeasonListDto {
    constructor(options) {
        this.seasons = options.seasons ? options.seasons.map(x => new SeasonDto(x)) : [];
    }

    stringify() {
        return JSON.stringify(this);
    }
}