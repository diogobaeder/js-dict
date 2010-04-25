module("get and set tests");

test("get an item without a default value", function(){
    var testDict = dict({'one': 'foo', 'two': 'bar'});
    
    equals(testDict.get('one'), 'foo');
    equals(testDict.get('two'), 'bar');
    equals(testDict.get('three'), null);
});

test("get an item with a default value", function(){
    var testDict = dict({'one': 'foo', 'two': 'bar'});
    
    equals(testDict.get('one', 'where?'), 'foo');
    equals(testDict.get('two', 'where?'), 'bar');
    equals(testDict.get('three', 'where?'), 'where?');
});

test("set a default value to an item", function(){
    var testDict = dict({'one': 'foo', 'two': 'bar'});
    
    testDict.setdefault('one', 'defined!');
    testDict.setdefault('two', 'defined!');
    testDict.setdefault('three', 'defined!');
    
    equals(testDict.get('one'), 'foo');
    equals(testDict.get('two'), 'bar');
    equals(testDict.get('three'), 'defined!');
});

module("elements verification");

test("verify key in dict", function(){
    var testDict = dict({'one': 'foo', 'two': 'bar'});
    
    ok(testDict.has_key('one'));
    ok(testDict.has_key('two'));
    equals(testDict.has_key('three'), false);
});

test("get dict keys", function(){
    var testDict = dict({'one': 'foo', 'two': 'bar'});
    
    same(testDict.keys(), ['one', 'two']);
});

test("get dict values", function(){
    var testDict = dict({'one': 'foo', 'two': 'bar'});
    
    same(testDict.values(), ['foo', 'bar']);
});

test("get dict items", function(){
    var testDict = dict({'one': 'foo', 'two': 'bar'});
    
    same(testDict.items(), [['one', 'foo'], ['two', 'bar']]);
});

module("dict mutation");

test("pop element without a default value", function(){
    var testDict = dict({'one': 'foo', 'two': 'bar'});
    
    equals(testDict.pop('one'), 'foo');
    equals(testDict.pop('two'), 'bar');
    equals(testDict.has_key('one'), false);
    equals(testDict.has_key('two'), false);
    equals(testDict.keys().length, 0);
});

test("pop element with a default value", function(){
    var testDict = dict({'one': 'foo', 'two': 'bar'});
    
    equals(testDict.pop('three'), null);
    equals(testDict.pop('three', "didn't find"), "didn't find");
    equals(testDict.keys().length, 2);
});

test("clear all items", function(){
    var testDict = dict({'one': 'foo', 'two': 'bar'});
    
    testDict.clear();
    
    equals(testDict.keys().length, 0);
});

module("dict copying");

test("copy all items", function(){
    var testDict = dict({'one': 'foo', 'two': 'bar'}),
        testDictCopy = testDict.copy();
    
    testDict['three'] = 'baz';
    
    equals(testDict.get('one'), 'foo');
    equals(testDictCopy.get('one'), 'foo');
    equals(testDict.get('three'), 'baz');
    equals(testDictCopy.get('three'), null);
});

test("new dict from keys without a default value", function(){
    var testDict = dict.fromkeys(['one', 'two']);
    
    equals(testDict.keys().length, 2);
    equals(testDict.get('one'), null);
    equals(testDict.get('two'), null);
});

test("new dict from keys with a default value", function(){
    var testDict = dict.fromkeys(['one', 'two'], 'foo');
    
    equals(testDict.keys().length, 2);
    equals(testDict.get('one'), 'foo');
    equals(testDict.get('two'), 'foo');
});
