/*********************************shopping cart class***************************************/  
  
    var product=function(productArr){
/*base class for class of product : productArr=>array; productArr['ID'], productArr['name'], productArr['pic'],=productArr['lvs'],productArr['width']£¬productArr['thickness '],productArr['length'],productArr['open'],productArr['capacity']*/  
        var _ID=productArr['ID'],_name=productArr['name'],_pic=productArr['pic'],_price=productArr['price'],_weight=productArr['weight'],_originalPrice=productArr['originalPrice'],_this=this;  
        this.num=productArr['num'];  
        this.getName=function(){  
            return _name;  
            }  
        this.getID=function(){  
            return _ID;  
            }     
        this.getPrice=function(){  
            return _price;  
            }  
        this.getWeight=function(){  
            return _weight;  
            }  
        this.getPic=function(){  
            return _pic;  
            }  
        this.getOriginalprice=function(){  
            return _originalPrice;  
            }  
        this.setNum=function(newNum){  
            _this.num=newNum;  
            }  
        this.getTotal=function(){  
            var total=_this.num*_this.getPrice();  
            return total;  
            }     
          
        }  
      
    var makeProductObj=function(gID,pID,num){
               // make productobject function,return the made product,gID=>databaseID£¬pID=>productID  
            /*********make part code*********/  
            var pData=[];  
            (function(gID,pID){  
                $.ajax({  
                    url:'/module/data/default.php?action=dataDetail&groupID='+gID+'&ID='+pID+'&r='+new Date(),  
                    type:'post',  
                    dataType:'xml',  
                    async:false,  
                    /**factory function***/  
                    success:function(dataXML){  
                        pData.price=$(dataXML).children('root').children('extend19').text();  
                        pData.originalPrice=$(dataXML).children('root').children('extend9').text();  
                        pData.weight=$(dataXML).children('root').children('extend21').text();  
                        pData.name=$(dataXML).children('root').children('name').text();  
                        pData.pic=$(dataXML).children('root').children('extend17').text();  
                        }  
                    });  
                })(gID,pID);  
            return new product({  
                num:num,  
                name:pData.name,  
                ID:pID,  
                price:pData.price,  
                pic:pData.pic,  
                weight:pData.weight,  
                originalPrice:pData.originalPrice,  
                });  
        }  
    var cartCookie=$.cookies.get('productItem');//cookie's global variable=>'prductID|count,productID|count'  
    //alert(mockCookie);  

      //class for product 
    var productCollection=function(){//class for product 
            var products=[];  
            var hasOne=function(productObj){  
                var isOne=0;  
                for(var i=0;i<products.length;i++){  
                    if(products[i].getID()==productObj.getID()){  
                        isOne=1;  
                        break;  
                        }  
                    }  
                return isOne;  
                }  
              var initProduct  
            /********initial products array code********/  
                       //alert(mockCookie);  
              if(cartCookie){  
                 initProduct=cartCookie.split(',');  
                 for(var i=0;i<initProduct.length;i++){  
                   var _productTemp=initProduct[i].split('|');  
                   var _proObj=new makeProductObj(4,parseInt(_productTemp[0]),parseInt(_productTemp[1]));  
                   if(hasOne(_proObj)!=1){  
                    products.push(_proObj);  
                   }  
                 }  
                          }  
            /*******initial products array code*********/  
              
            this.addProduct=function(productObj){//add product 
                   if(hasOne(productObj)!=1){  
                        products.push(productObj);  
                    }  
                }  
            this.delProduct=function(productObj){//delete product 
                var _tempProducts=[];  
                for(var i=0;i<products.length;i++){  
                    if(products[i].getID()!==productObj.getID()){  
                        //console.log(products[i].getID());  
                        _tempProducts.push(products[i]);  
                        }  
                    }  
                    products=_tempProducts;  
                }//del  
            this.setNumByPid=function(pID,newNum){//set product number 
                    for(var k=0;k<products.length;k++){  
                        if(products[k].getID()==pID){  
                            products[k].setNum(newNum);  
                            break;  
                            }  
                        }  
                }  
            this.getProductById=function(pID){//pID is productID£¬get product object  
                    for(var j=0;j<products.length;j++){  
                        if(products[j].getID()==pID){  
                            return products[j];  
                            break;  
                            }  
                        }  
                    return false;  
                }  
            this.getProducts=function(){//get product array   
                return products;  
                }  
            this.getNeedMoney=function(){//get the total price for all products  
                var _needMoney=0;  
                for(var k=0;k<products.length;k++){  
                    _needMoney+=products[k].getTotal();  
                    }  
                return _needMoney;  
                }//getNeedMoney   
        }  
          
      
    var cart=function(){
            var _productCollection='';  
            var _nowCollection='';  
            var _this=this;  
            this.setCollection=function(collection){//set collection  
                _productCollection=collection;  
                _nowCollection=_productCollection;// dynamic collection object  
                _this.setTemp();  
                }  
            this.temp=[];//initial collection object   
            this.setTemp=function(){  
                    if(!_productCollection){  
                        throw new Error('please make special collection object!');  
                        }  
                    var listProduct=_productCollection.getProducts();  
                    for(var i=0;i<listProduct.length;i++){  
                            _this.temp[i]=[];  
                            _this.temp[i]=listProduct[i];  
                        }  
                };  
            this.delProduct=function(pID){//delete single pID-> product ID  
                    var needProduct=_nowCollection.getProductById(pID);  
                    if(needProduct!=false){  
                        _nowCollection.delProduct(needProduct);  
                        }  
                }  
            this.setNumByPid=function(pID,newNum){//set a product tpye's number,pID->productID  
                    _nowCollection.setNumByPid(pID,newNum);  
                }  
            this.getCurrentNumByPid=function(pID){//get a type of product's number£¬pID->productID  
                    var productObj=_nowCollection.getProductById(pID);  
                    return productObj.num;  
                }  
            this.getTotalMoney=function(){//get total number of money
                    var _money=_nowCollection.getNeedMoney();  
                    return _money;  
                }  
            this.getTotalMoneyByPid=function(pID){//get a special types of product's total money 
                    var _needProduct=_nowCollection.getProductById(pID);  
                    if(_needProduct===false){  
                        throw new Error('product can not be find');  
                        }  
                    var _totalMoney=_needProduct.getTotal();  
                    return _totalMoney;  
                }  
            this.renderCart=function(){
                    throw new Error('error, subclass');  
                }  
            this.bindEvent=function(){ 
                    throw new Error('error,subclass');  
                }  
            //this.renderCart();  
            this.touchOff=function(){  
                    _this.renderCart();  
                    _this.bindEvent();  
                }  
            this.getNewCollection=function(){//get new collection object
                    return _nowCollection;  
                }  
        }  
/********************************shopping cart class****************************************/  
        var shoppingTrolley=function(){  
                //alert('test');  
                /***************check*****************/  
                if(!cartTest){  
                    throw new Error('please declera cart object');  
                    }  
                /***************check ***************/  
                cartTest.renderCart=function(){  
                            var _content='';  
                            for(var i=0;i<this.getNewCollection().getProducts().length;i++){  
                                    var _productEach=this.getNewCollection().getProducts()[i];  
                                    //alert(_productEach.getName());  
                                     _content+='<tr class="cartList"><td height="25" align="center" valign="middle" bgcolor="#FFFFFF" class="name"><input type="hidden" value="'+_productEach.getID()+'"/>'+_productEach.getName()+'</td><td height="25" align="center" valign="middle" bgcolor="#FFFFFF"><em>$'+_productEach.getOriginalprice()+'</em></td><td height="25" align="center" valign="middle" bgcolor="#FFFFFF" class="red">$'+_productEach.getPrice()+'</td><td height="25" align="center" valign="middle" bgcolor="#FFFFFF">'+_productEach.getWeight()+'Kg</td><td width="21" height="25"  align="center" valign="middle" class="numJian" bgcolor="#FFFFFF">-</td><td width="28" height="25" align="center" valign="middle" bgcolor="#FFFFFF" class="nowNum"><span class="red">'+_productEach.num+'</span></td><td width="21" height="25"  align="center" valign="middle" class="numJia" bgcolor="#FFFFFF">+</td><td height="25" align="center" valign="middle" bgcolor="#FFFFFF" class="eachTotal">$'+_productEach.getTotal()+'</td><td height="25" align="center" valign="middle" bgcolor="#FFFFFF" class="red">Delete</td></tr>';  
                                }  
                            //document.write(_content);  
                            //alert(_content);  
                            $('#checkCart').find('tr').eq(0).after(_content);
                            $('.step_total').find('.step_total_right').children('span').html('$'+cartTest.getTotalMoney());  
                            /**popBoxCount**/  
                    }//renderCart  
                    cartTest.bindEvent=function(){  
                                    var _this=this;  
                                    //alert($('#'+win1.ID).find('.cartList').eq(0).html());  
                                    $('#checkCart').find('.cartList').each(function(index){  
                                            var _each=$(this);  
                                            _each.find('td:last').css('cursor','pointer').click(function(){  
                                                //alert('ÉŸ³ý');  
                                                var _tempThis=$(this);  
                                                _this.delProduct($(this).parents('tr').find('td:first').find('input[type=hidden]').val());  
                                                $(this).parents('tr').remove();  
                                                /*******recalculate total price of products*******/  
                                                $('.step_total').find('.step_total_right').children('span').html('$'+_this.getTotalMoney());  
                                                /*******recalculate total price of products*******/  
                                                });//click delete product 
                                              
                                            _each.children('td[class=numJia]').css('cursor','pointer').click(function(){  
                                                    var _jiaThis=$(this);  
                                                    //alert($(this).parents('tr').parents('table').find('input[type=hidden]').val());  
                                                    _this.setNumByPid($(this).parents('tr').find('td:first').find('input[type=hidden]').val(),_this.getCurrentNumByPid($(this).parents('tr').find('td:first').find('input[type=hidden]').val())+1);  
                                                    //alert(_jiaThis.parents('td').siblings('td[class=nowNum]').children('input').val());  
                                                    _jiaThis.siblings('td[class=nowNum]').html(  
                                                        _this.getCurrentNumByPid(_jiaThis.parents('tr').find('td:first').find('input[type=hidden]').val())  
                                                    );  
                                                    /***********recalculate a type of total price of products***********/  
                                                    _jiaThis.siblings('td[class=eachTotal]').children('span').html('$'+_this.getTotalMoneyByPid(_jiaThis.parents('tr').find('td:first').find('input[type=hidden]').val()));  
                                                    /***********recalculate price of a product***********/  
                                                      
                                                    /*******recalculate total price of products*******/  
                                                    $('.step_total').find('.step_total_right').children('span').html('$'+_this.getTotalMoney());  
                                                    /*******recalculate total price of products*******/  
                                                });//click add product number  
                                            _each.children('td[class=numJian]').css('cursor','pointer').click(function(){  
                                                    var _jianThis=$(this);  
                                                    if(_this.getCurrentNumByPid($(this).parents('tr').find('td:first').find('input[type=hidden]').val())>1){  
                                                        _this.setNumByPid($(this).parents('tr').find('td:first').find('input[type=hidden]').val(),_this.getCurrentNumByPid($(this).parents('tr').find('td:first').find('input[type=hidden]').val())-1);  
                                                        _jianThis.siblings('td[class=nowNum]').html(  
                                                        _this.getCurrentNumByPid($(this).parents('tr').find('td:first').find('input[type=hidden]').val())  
                                                    );  
                                                    /***********recalculate total money***********/  
                                                    _jianThis.siblings('td[class=eachTotal]').children('span').html('$'+_this.getTotalMoneyByPid(_jianThis.parents('tr').find('td:first').find('input[type=hidden]').val()));  
                                                    /***********recalculate a product total money***********/  
                                                      
                                                    /*******recalculate total money*******/  
                                                    $('.step_total').find('.step_total_right').children('span').html('$'+_this.getTotalMoney());  
                                                    /*******recalculate total money*******/  
                                                        }//if product number is bigger than 1  
                                                });//click sub product number 
                                        });//each  
                            }//bindEvent  
                    cartTest.touchOff();//  
                      
                    $(window).unload(function(){//when leave page 
                          
                            var lastCollection=cartTest.getNewCollection();   
                            var _products=lastCollection.getProducts();  
                            //console.log(_products.length);  
                            var _cartCookie='';  
                            var _countNum=0;  
                            for(var i=0;i<_products.length;i++){  
                                    _cartCookie+=_products[i].getID()+'|'+_products[i].num+',';  
                                    _countNum+=_products[i].num*_products[i].getWeight();  
                                }  
                            _cartCookie=_cartCookie.substring(0,_cartCookie.length-1);  
                            //alert(_cartCookie);  
                            //alert(_cuntNum);  
                            //alert(_countNum);  
                            $.cookies.set('productItem',_cartCookie);//setcookie  
                            $.cookies.set('countNum',_countNum);//set num of cookie  
                        });  
                          
                        $('#btn').click(function(){  
                            /******************if return no product select*****************/  
                            var _listProducts=cartTest.getNewCollection().getProducts();  
                            if(_listProducts.length<0||_listProducts.length==0){  
                                    alert('Please select products!');  
                                    return;  
                                }  
                            window.location.href='/step2/';  
                        });  
                  
            }  
    /**********************shopping cart class***********************************/  
      
    /******************object******************/   
    var productCollections= new productCollection();  
    var cartTest=new cart();  
    cartTest.setCollection(productCollections);  
    new shoppingTrolley();  
