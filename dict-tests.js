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
