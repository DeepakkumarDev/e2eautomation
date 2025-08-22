module.exports.registerUser = function(username){
    if(!username) throw new Error(`${username} is not defined`);

    return {id: new Date().getTime(),username:username};
}






module.exports.getProduct = function (productId) {
  const products = [
    { id: 1, price: 10, category: 'a' },
    { id: 2, price: 20, category: 'b' },
    { id: 3, price: 30, category: 'c' },
    { id: 4, price: 40, category: 'd' },
    { id: 5, price: 50, category: 'e' },
    { id: 10, price: 100, category: 'z' }
  ];
  const id = Number(productId);

  const productWithId= products.find(p => p.id === id);


  return productWithId?Object.assign({},productWithId):null;
//   return productWithId?{...productWithId}:null;

//   const product = Object.assign({},productWithId);
//   return product;


//   return products.find(p => p.id === productId) || {};
};



// module.exports.getProduct = function(productId){
//     return {id: productId,price: 10,category:'a'};
// }

module.exports.getCurrencies = function(){
    return ['USD','AUD','EUR'];
}


module.exports.greet = function(name){
    return `Welcome ${name}!`;
}


module.exports.absolute = function(number){
    return (number>=0)?number: -number;
}

// module.exports.absolute = function(number){
//     if(number > 0) return number;
//     if(number < 0) return -number;
//     return 0;
// }