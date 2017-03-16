
class Card {
    constructor(id, name, visibility, pullRequests, url) {
        this.id = id || '';
        this.name = name || '';
        this.private = visibility || false;
        this.pullRequests = pullRequests || [];
        this.url = url || '';

        Object.seal(this);
    }
}

export default Card;
