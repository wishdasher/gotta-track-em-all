
/* CREATE ALL DATABASE CARDS */

// TODO: load json cards

var cards = {
}

class Card {
	// TODO: add card set info? too much...

	constructor(name, img) {
		this._quantity = 0;
		this._wishlist = false;
	}

	get quantity ()    { return this._quantity; }
	get wishlist ()    { return this._wishlist; }
	set quantity (qnt) { this._quantity = qnt; }

	addToWishlist()      { this._wishlist = true; }
	removeFromWishList() { this._wishlist = false; }
}