export default class GenderDto {
    constructor(options = {}) {
        this.id = options.id || 0;
        this.description = options.description || '';
    }

    stringify() {
        return JSON.stringify(this);
    }
}