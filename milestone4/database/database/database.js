food1={
_id:1,
name:"Chef's Fried Rice",
quantity:100,
price:7.95
}

food2={
_id:2,
name:"Beef Fried Rice",
quantity:100,
price:7.95
}

food3={
_id:3,
name:"Hot and Sour soup",
quantity:100,
price:5.99
}

food4={
_id:4,
name:"Egg Roll",
quantity:100,
price:1.09
}

food5={
_id:5,
name:"Kung Po Squid",
quantity:100,
price:10.95
}

food6={
_id:6,
name:"Boiled Shell Shrimps",
quantity:100,
price:10,95
}

food7={
_id:7,
name:"Cumin Spicy Chicken",
quantity:100,
price:9.95
}

food8={
_id:8,
name:"Curry Chicken",
quantity:100,
price:9.95
}

food9={
_id:9,
name:"Szechuan Beef",
quantity:100,
price:11.95
}

food10={
_id:10,
name:"Tofu Egg Omelet",
quantity:100,
price:8.95
}

food11 = {
_id:11,
name:"OVEN ROASTED POTATO WEDGES",
quantity:100,
price:9.25
}

food12 = {
_id:12,
name:"BRUSCHETTA",
quantity:100,
price:10.25
}

food13 = {
_id:13,
name:"HIPPIE",
quantity:100,
price:10.25
}

food14 = {
_id:14,
name:"SHRIMP GRATIN",
quantity:100,
price:12.25
}

food15 = {
_id:15,
name:"VOODOO MEATBALLS",
quantity:100,
price:11.25
}

food16 = {
_id:16,
name:"NACHOS",
quantity:100,
price:12.95
}

food17 = {
_id:17,
name:"CHICKEN NACHOS",
quantity:100,
price:14.95
}

food18 = {
_id:18,
name:"HOLY SMOKE",
quantity:100,
price:14.95
}

food19 = {
_id:19,
name:"IRISH NACHOS",
quantity:100,
price:15.95
}

food20 = {
_id:20,
name:"ZUCCHINI",
quantity:100,
price:10.25
}

var collections=["food1","food2","food3","food4","food5","food6","food7","food8","food9","food10","food11","food12","food13","food14","food15","food16","food17","food18","food19","food20"];

for(i in collections){
doStuff(db.cart[collections[i]]);
}
