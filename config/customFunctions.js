// module.exports = {
  
//     selectOption : function (status, options) {
        
//         return options.fn(this).replace(new RegExp('value=\"'+status+'\"'), '$&selected="selected"');
//     },
    
//     isEmpty: function (obj) {
//         for(let key in obj) {
//             if(obj.hasOwnProperty(key)) {
//                 return false;
//             }
//         }
        
//         return true;
//     },

//     // isUserAuthenticated: (req, res, next) => {
//     //     if(req.is) {
//     //         next();
//     //     } else {
//     //         res.redirect('/login');
//     //     }
//     // }
    
// };

module.exports = {
  
    selectOption: function (status, options) {
        // Use a regular expression with proper escaping
        return options.fn(this).replace(new RegExp('value="' + status + '"'), '$&selected="selected"');
    },
    
    isEmpty: function (obj) {
        // Simplify the function using Object.keys
        return Object.keys(obj).length === 0;
    },
    
    isUserAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/login');
        }
    }
};

