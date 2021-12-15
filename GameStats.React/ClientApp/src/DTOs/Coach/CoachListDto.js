import CoachDto from './CoachDto';

export default class CoachListDto {
    constructor(options) {
        this.coaches = options.coaches ? options.coaches.map(x => new CoachDto(x)) : [];
    }

    stringify() {
        return JSON.stringify(this);
    }
}