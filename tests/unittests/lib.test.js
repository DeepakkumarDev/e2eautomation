// const { describe } = require("node:test");
const lib = require("../../unitdir/lib");


describe('registerUser',()=>{
    it('should throw if username is falsy',()=>{
        // null,undefined,NaN,'0,false
        expect(()=>{lib.registerUser(null)}).toThrow();
        const args = [null,undefined,NaN,'',0,false];
        
        args.forEach(a=>{
            expect(()=>{lib.registerUser(a)}).toThrow();
        })
    });
    it("Should return a user object if valid username is passed",()=>{
        const result = lib.registerUser('mosh');
        expect(result).toMatchObject({username:'mosh'});
        expect(result.id).toBeGreaterThan(0);

    });
});




describe.skip("getProduct",()=>{
    it("should return product with the given id",()=>{
        const result = lib.getProduct(1);
        // expect(result).toBe({id:1,price:10});
        // expect(result).toEqual({id:1,price:10});
        expect(result).toMatchObject({id:1,price:10});
        expect(result).toHaveProperty('id',1);
        
    })
})



describe.skip('getCurrencies',()=>{
    it('should return supported currencies',()=>{
        // Too general
        const result = lib.getCurrencies();
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        // Too specific 
        expect(result[0]).toBe('USD');
        expect(result[1]).toBe('AUD');
        expect(result[2]).toBe('EUR');
        expect(result.length).toBe(3);

        // proper way 
        expect(result).toContain('AUD');
        expect(result).toContain('USD');
        expect(result).toContain('EUR');

        // IDEAL way 

        expect(result).toEqual(expect.arrayContaining(['EUR','AUD','USD']))
    })
})

describe.skip("greet",()=>{
    it('should return the greeting message',()=>{
        const result = lib.greet("Mosh");
        expect(result).toBe('Welcome Mosh!');
        expect(result).toMatch(/Mosh/);
        expect(result).toContain('Mosh');
    });
});




describe.skip('absolute',()=>{
    
    it("should return a positive number if input is positive",()=>{
        const result = lib.absolute(1);
        expect(result).toBe(1);
    
    });
    
    
    it("should return a positive number if input is negative",()=>{
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    })
    
    
    it("should return 0 if the input is 0",()=>{
        const result = lib.absolute(0);
        expect(result).toBe(0);
    
    });

})


// test("absolute -should return a positive number if input is positive",()=>{
//     const result = lib.absolute(1);
//     expect(result).toBe(1);

// });


// test("absolute - should return a positive number if input is negative",()=>{
//     const result = lib.absolute(-1);
//     expect(result).toBe(1);
// })


// test("absolute - should return 0 if the input is 0",()=>{
//     const result = lib.absolute(0);
//     expect(result).toBe(0);

// });





// test("Our first test",()=>{
//     throw new Error("Something failed");
    
// })