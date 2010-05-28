var listId = "testlist";
var listId2 = "testlist";

var stringList = ["one", "two", "three", "four"];
var firstListItem = "one";
var lastListItem = "four";

var onAfterFlushAllAndStringListAdd = function(onSuccessFn, onErrorFn)
{
    var i = 0;
    redis.flushAll(function() {
        for (var i = 0; i < stringList.length; i++) {
            redis.addItemToList(listId, stringList[i], function() {
                if (i++ == stringList.length - 1) onSuccessFn();
            }, onErrorFn || failFn);
        }
    }, onErrorFn || failFn);
};


YAHOO.namespace("ajaxstack");
YAHOO.ajaxstack.RedisClientListTests = new YAHOO.tool.TestCase({

    name: "RedisClientList Tests",

    //--------------------------------------------- 
    // Setup and tear down 
    //---------------------------------------------

    setUp: function() {
        resume = this.resume;
        wait = this.wait;
    },

    tearDown: function() {
    },

    //--------------------------------------------- 
    // Tests 
    //---------------------------------------------

    testAddItemToList: function() {
        redis.addItemToList(listId, testValue, function() {
            redis.getItemFromList(listId, '0', function(item) {
                resume(function() {
                    Assert.areEqual(item, testValue);
                });
            }, failFn);
        }, failFn);

        wait();
    },

    /*
    testBlockingDequeueItemFromList: function() {
        onAfterFlushAllAndStringListAdd(function() {
            redis.blockingDequeueItemFromList(listId, function(item) {
                resume(function() {
                    Assert.areEqual(item, firstListItem);
                });
            }, failFn);
        }, failFn);

        wait();
    },

    testBlockingPopItemFromList: function() {
        onAfterFlushAllAndStringListAdd(function() {
            redis.blockingPopItemFromList(listId, function(item) {
                resume(function() {
                    Assert.areEqual(item, lastListItem);
                });
            }, failFn);
        }, failFn);

        wait();
    },

    testBlockingRemoveStartFromList: function() {
        onAfterFlushAllAndStringListAdd(function() {
            redis.blockingRemoveStartFromList(listId, function(item) {
                resume(function() {
                    Assert.areEqual(item, firstListItem);
                });
            }, failFn);
        }, failFn);

        wait();
    },
    */

    testEnqueueItemOnList: function() {
        onAfterFlushAllAndStringListAdd(function() {
            redis.enqueueItemOnList(listId, testValue, function() {
                redis.getItemFromList(listId, '0', function(item) {
                    resume(function() {
                        Assert.areEqual(item, firstListItem);
                    });
                }, failFn);
            }, failFn);
        }, failFn);

        wait();
    },

    testGetAllItemsFromList: function() {
        onAfterFlushAllAndStringListAdd(function() {
            redis.getAllItemsFromList(listId, function(items) {
                resume(function() {
                    Assert.isTrue(A.areEqual(items, stringList));
                });
            }, failFn);
        }, failFn);

        wait();
    },

    testGetListCount: function() {
        onAfterFlushAllAndStringListAdd(function() {
            redis.getListCount(listId, function(count) {
                resume(function() {
                    Assert.areEqual(count, stringList.length);
                });
            }, failFn);
        }, failFn);

        wait();
    },

    testGetRangeFromList: function() {
        onAfterFlushAllAndStringListAdd(function() {
            redis.getRangeFromList(listId,'0',2, function(items) {
                resume(function() {
                    Assert.isTrue(A.areEqual(items, A.take(stringList, 3)));
                });
            }, failFn);
        }, failFn);

        wait();
    },

    testGetRangeFromSortedList: function() {
        onAfterFlushAllAndStringListAdd(function() {
            redis.getRangeFromSortedList(listId,'0',3, function(items) {
                resume(function() {
                    Assert.isTrue(A.areEqual(items, A.take(stringList, 3)));
                });
            }, failFn);
        }, failFn);

        wait();
    },

    testPopAndPushItemBetweenLists: function() {
        onAfterFlushAllAndStringListAdd(function() {
            redis.popAndPushItemBetweenLists(listId,listId2, function(item) {
                resume(function() {
                    Assert.areEqual(item, lastListItem);
                });
            }, failFn);
        }, failFn);

        wait();
    },

    testPopItemFromList: function() {
        onAfterFlushAllAndStringListAdd(function() {
            redis.popItemFromList(listId, function(item) {
                resume(function() {
                    Assert.areEqual(item, lastListItem);
                });
            }, failFn);
        }, failFn);

        wait();
    },

    testPrependItemToList: function() {
        onAfterFlushAllAndStringListAdd(function() {
            redis.prependItemToList(listId, testValue, function() {
                redis.getItemFromList(listId, '0', function(items) {
                    resume(function() {
                        var matchingList = A.insert(A.clone(stringList), 0, testValue);
                        Assert.isTrue(A.areEqual(items, matchingList));
                    });
                }, failFn);
            }, failFn);
        }, failFn);

        wait();
    },

    testPushItemToList: function() {
        onAfterFlushAllAndStringListAdd(function() {
            redis.pushItemToList(listId, testValue, function() {
                redis.getAllItemsFromList(listId, function(items) {
                    resume(function() {
                        var matchingList = A.clone(stringList).push(testValue);
                        Assert.isTrue(A.areEqual(items, matchingList));
                    });
                }, failFn);
            }, failFn);
        }, failFn);

        wait();
    },

    testRemoveAllFromList: function() {
        onAfterFlushAllAndStringListAdd(function() {
            redis.removeAllFromList(listId, function(item) {
                redis.getAllItemsFromList(listId, function(items) {
                    resume(function() {
                        Assert.areEqual(items.length, 0);
                    });
                }, failFn);
            }, failFn);
        }, failFn);

        wait();
    },

    testRemoveEndFromList: function() {
        onAfterFlushAllAndStringListAdd(function() {
            redis.removeEndFromList(listId, function(item) {
                resume(function() {
                    Assert.areEqual(item, lastListItem);
                });
            }, failFn);
        }, failFn);

        wait();
    },

    testRemoveItemFromList: function() {
        onAfterFlushAllAndStringListAdd(function() {
            redis.removeItemFromList(listId, lastListItem, function(itemsRemoved) {
                redis.getAllItemsFromList(listId, function(items) {
                    resume(function() {
                        var matchingList = A.clone(stringList).shift();
                        Assert.isTrue(A.areEqual(items, matchingList));
                    });
                }, failFn);
            }, failFn);
        }, failFn);

        wait();
    },

    testRemoveStartFromList: function() {
        onAfterFlushAllAndStringListAdd(function() {
            redis.removeStartFromList(listId, function(item) {
                resume(function() {
                    Assert.areEqual(item, firstListItem);
                });
            }, failFn);
        }, failFn);

        wait();
    },

    testSetItemInList: function() {
        onAfterFlushAllAndStringListAdd(function() {
            redis.setItemInList(listId, 1, testValue, function() {
                resume(function() {
                    var matchingList = A.clone(stringList);
                    matchingList[1] = testValue;
                    Assert.isTrue(A.areEqual(items, matchingList));
                });
            }, failFn);
        }, failFn);

        wait();
    },

    testTrimList: function() {
        onAfterFlushAllAndStringListAdd(function() {
            redis.trimList(listId, '0', 2, function() {
                redis.getAllItemsFromList(listId, function(items) {
                    resume(function() {
                        var matchingList = A.take(A.clone(stringList), 3);
                        Assert.isTrue(A.areEqual(items, matchingList));
                    });
                }, failFn);
            }, failFn);
        }, failFn);

        wait();
    },

    testPause_for_a_sec: function() {
        wait(function() {
            Assert.isTrue(true);
        }, 1000);
    }

});

