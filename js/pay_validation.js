
var pay_validation = angular.module('pay_validation',[]);

pay_validation.controller('mainCtrl',function($scope){
     var currency=[
    {name:'Рубль',sign:'₽',value:'ruble'},
    {name:'Доллар',sign:'$',value:'dollar'},
    {name:'Евро',sign:'€',value:'euro'}    
       
    ];

$scope.imgSrc='';
$scope.payment_amount=0;
$scope.currency=currency;
$scope.name_on_card='';
$scope.security_code='';
$scope.selected_currency=$scope.currency[0];
$scope.payment_amount_access=false;
$scope.expire_date='';
$scope.showedExample=false;
$scope.formHeight='form_heigth1';

$scope.showExample=function(){
    ($scope.showedExample)? $scope.showedExample=false : $scope.showedExample=true;
    ($scope.formHeight='form_heigth1')? $scope.formHeight='form_heigth2' : $scope.formHeight='form_heigth1';
};

$scope.expireDateChangeHandler =function(){
 if($scope.expire_date !==undefined){        
      
      var str = String($scope.expire_date);      
      var pattern = new RegExp('[a-zа-я]+','i');  
      
      var new_str='';
            
        
      if(str.search(pattern)!== -1 || str.length>5){     
      new_str= $scope.expire_date.substr(0,$scope.expire_date.length-1);
      $scope.expire_date=new_str;
      }
      if($scope.expire_date.length=='2'){
        $scope.expire_date=$scope.expire_date+'/';  
      }
      
       
    }     
    
};

$scope.paymentAmountChangeHandler = function(){
   
    if($scope.payment_amount !==undefined){      
      
      
      var str = String($scope.payment_amount);      
      var pattern = new RegExp('[0-9,]+','i');  
      
      var new_str='';
      var inputChar=str.charAt(str.length-1);
        
        
      if(inputChar.search(pattern)=== -1 || str.length>12){
        
      
      new_str= $scope.payment_amount.substr(0,$scope.payment_amount.length-1);
      $scope.payment_amount=new_str;
      }
      
       
    }else{
       $scope.payment_amount=0; 
    }   
};

$scope.paymentAmountClickHandler = function(){
  
     
  $scope.payment_amount_access=true;
};

$scope.paymentAmountBlurHandler = function(){
    
    if($scope.payment_amount=== undefined){
      $scope.payment_amount = 0;  
    }
    
  $scope.payment_amount_access=false;
};

$scope.securityCodeNumberChangeHandler=function(){
  if($scope.security_code !==undefined){      
      $scope.security_code = $scope.security_code.replace(/\s+/g, '');
      var str = String($scope.security_code);      
      var pattern = new RegExp('[a-zа-я]+','i');       
      var new_str='';
      
      if(str.search(pattern)!== -1 || str.length>4){
       
      new_str= $scope.security_code.substr(0,$scope.security_code.length-1);
      $scope.security_code=new_str;
      }
      
       
    }   
};

$scope.nameOnCardNumberChangeHandler = function(){
   
   if($scope.name_on_card !==undefined){      
      $scope.name_on_card=$scope.name_on_card.toUpperCase();
      var str = String($scope.name_on_card);
      
      var pattern = new RegExp('[а-я]|[0-9]','i');      
      var new_str='';
      if(str.search(pattern)!== -1){
       
      new_str= $scope.name_on_card.substr(0,$scope.name_on_card.length-1);
      $scope.name_on_card=new_str;
      }
      
       
    } 
};

$scope.cardNumberChangeHandler = function(){
    
    //Определяет адрес изображения карты по первой цифре
    function findCardImg(){ 
    var cards=[
    {code:3,name:'american_express'},
    {code:4,name:'visa'},
    {code:5,name:'master_card'},
    {code:6,name:'discover'}
        
    ];
    if($scope.card_number!== undefined){
    var firstChar = +$scope.card_number.charAt(0); 
    
    var card_name='';
    cards.forEach(function(item) {
    if(item.code=== firstChar){
        card_name=item.name;
    }   
        
    });
    if((card_name)==='') {
       $scope.imgSrc="background-image: url('/img/undefined.png')";
    }else{
       $scope.imgSrc="background-image: url('/img/"+card_name+".png')";    
    } 
    
    }else{
       $scope.imgSrc='';
    }
    
    }
    //ввод номера карты с пробелами
    function rightInput(){
    if($scope.card_number !==undefined){ 
       
      var str = String($scope.card_number);
     
      var pattern = new RegExp('[a-zа-я]+','i');      
      var new_str='';
      if(str.search(pattern) !== -1){
       
      new_str= $scope.card_number.substr(0,$scope.card_number.length-1);
      $scope.card_number=new_str;
      }
       
      $scope.card_number = $scope.card_number.replace(/\s+/g, '');
      if($scope.card_number.length > 16){
         $scope.card_number = $scope.card_number.substr(0,$scope.card_number.length-1);
       } 
      
      var str = String($scope.card_number);
      var new_str='';
       for(var i=0;i<$scope.card_number.length;i++)
       {
         if((i%4)==0 && !i==0){
             new_str += ' ';
         }  
         new_str +=str.charAt(i);  
       }
       $scope.card_number=new_str;
    }
    }
    findCardImg();
    rightInput();
    
};

});