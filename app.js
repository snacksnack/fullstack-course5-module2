(function () {
'use strict';

var items = [
  {name: "ants",quantity: 1},
  {name: "bats",quantity: 2},
  {name: "cats",quantity: 3},
  {name: "dogs",quantity: 4},
  {name: "emus",quantity: 5},
  {name: "frogs",quantity: 6},
  {name: "hens",quantity: 7}
];

angular.module('ShoppingListCheckOff', []).
controller('ToBuyShoppingController', ToBuyShoppingController).
controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController).
service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var itemToBuy = this;
  
  itemToBuy.items = ShoppingListCheckOffService.getBuyItems();
  
  itemToBuy.checkOff = function(itemIndex) {
    ShoppingListCheckOffService.checkOff(itemIndex);
  };

  itemToBuy.alert = function() {
    return itemToBuy.items.length === 0;
  };
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var itemBought = this;

  itemBought.items = ShoppingListCheckOffService.getBoughtItems();

  itemBought.alert = function() {
    return itemBought.items.length === 0;
  };

}

function ShoppingListCheckOffService() {

  var itemsToBuy = items;
  var boughtItems = [];

  var service = this;

  service.checkOff = function(itemIndex) {
    //remove item from itemsToBuy, push items onto boughtItems...
    boughtItems.push(itemsToBuy[itemIndex]);
    itemsToBuy.splice(itemIndex,1);
  };

  service.getBuyItems = function() {
    return itemsToBuy;
  };

  service.getBoughtItems = function() {
    return boughtItems;
  };

  service.hasItemsToBuy = function() {
    var count = itemsToBuy.length;
    if (count === 0) {
      return false;
    } else {
      return true;
    }
  };

  /*service.hasBoughtItems = function() {
    var count = boughtItems.length;
    if (count === 0) {
      return false;
    } else {
      return true;
    }
  };*/

}


})();