(function(){
// Auxiliary function to apply a function to each non-native property
function _walkKeys(obj, callback) {
    var prop;
    for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            callback(prop);
        }
    }
}

window.dict = function(obj) {
    return new PythonDict(obj);
};

window.PythonDict = function(obj) {
    var that = this;
    if (obj) {
        _walkKeys(obj, function(prop){
            that[prop] = obj[prop];
        });
    }
};

PythonDict.prototype = {
    setdefault: function(key, val) {
        if (this[key] === undefined) {
            this[key] = val;
        }
    },
    // Returns null if not found, which is equivalent to None in Python,
    // or a predefined value
    get: function(key, defaultVal) {
        var val = this[key];
        if (val === undefined) {
            return defaultVal || null;
        }
        return val;
    },
    keys: function() {
        var keys = [];
        _walkKeys(this, function(prop){
            keys.push(prop);
        });
        return keys;
    },
    values: function() {
        var values = [], that = this;
        _walkKeys(this, function(prop){
            values.push(that[prop]);
        });
        return values;
    },
    items: function() {
        var items = [], that = this;
        _walkKeys(this, function(prop){
            items.push([prop, that[prop]]);
        });
        return items;
    },
    has_key: function(key) {
        return this[key] !== undefined;
    },
    pop: function(key, defaultVal) {
        var val = this[key];
        if (val !== undefined) {
            delete this[key];
            return val;
        }
        return defaultVal || null;
    },
    clear: function() {
        var that = this;
        _walkKeys(this, function(prop){
            that.pop(prop);
        });
    },
    copy: function() {
        return new PythonDict(this);
    }
};

PythonDict.fromkeys = function(keys, val) {
    var newDict = new PythonDict(),
        i, length, key;
    if (val === undefined) val = null;
    for (i = 0, length = keys.length; i < length; i++) {
        newDict[keys[i]] = val;
    }
    return newDict;
};
dict.fromkeys = PythonDict.fromkeys;
})();
