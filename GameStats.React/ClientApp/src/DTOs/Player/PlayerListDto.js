import PlayerDto from './PlayerDto';

export default class PlayerListDto {
    constructor(options) {
        this.players = options.players ? options.players.map(x => new PlayerDto(x)) : [];
    }

    stringify() {
        return JSON.stringify(this);
    }
}