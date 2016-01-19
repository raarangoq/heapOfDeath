

function itemsBar(){
	this.itemsBar = game.add.sprite(20, 495, 'healthBar');


	this.itemImage = [];
//	this.itemImage['light'] = game.add.sprite(80, 500, 'light');
//	this.itemImage['light'].visible = false;
	this.itemImage['velocity'] = game.add.sprite(80, 500, 'velocity');
	this.itemImage['velocity'].visible = false;
	this.itemImage['shield'] = game.add.sprite(40, 500, 'shield');
	this.itemImage['shield'].visible = false;

	this.update = updateItemsBar;
	this.setItemsBarAbility = setItemsBarAbility;
	this.useItemsBarAbility = useItemsBarAbility;
	this.setDrawOrder = itemsBarSetDrawOrder;
	this.setAlive = itemsBarSetAlive;
}


function updateItemsBar(){
	if(player.shield.visible)
		this.itemImage['shield'].visible = true;
	else
		this.itemImage['shield'].visible = false;
}

function itemsBarSetDrawOrder(){
	this.itemsBar.bringToTop();
//	this.itemImage['light'].bringToTop();
	this.itemImage['velocity'].bringToTop();
}


function useItemsBarAbility(type){
	this.itemImage[type].visible = false;
}

function setItemsBarAbility(type){
	this.itemImage[type].visible = true;

}

function itemsBarSetAlive(value){
	if (value){
		this.itemsBar.revive();
//		this.itemImage['light'].revive();
		this.itemImage['velocity'].revive();
	}
	else {
		this.itemsBar.kill();
//		this.itemImage['light'].kill();
		this.itemImage['velocity'].kill();
	}
}