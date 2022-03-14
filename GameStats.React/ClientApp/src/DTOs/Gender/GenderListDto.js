import GenderDto from './GenderDto';

export default class GenderListDto {
    constructor(options) {
        this.genders = options.genders ? options.genders.map(x => new GenderDto(x)) : [];
    }

    stringify() {
        return JSON.stringify(this);
    }
}