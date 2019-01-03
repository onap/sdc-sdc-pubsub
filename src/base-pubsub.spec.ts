declare const window: Window;

import {BasePubSub} from './base-pubsub';

describe('BasePubSub Tests', () => {
    let basePubSub: BasePubSub;

    let testSub: string = 'testSub';
    let testWindow = window;
    let testSubUrl: string = 'http://127.0.0.1';

    beforeEach(() => {
        basePubSub = new BasePubSub('testId');
    });

    describe('constructor tests', () => {
        it('should init class property', () => {
            expect(basePubSub.subscribers.size).toBe(0);
            expect(basePubSub.eventsCallbacks.length).toBe(0);
            expect(basePubSub.eventsToWait.size).toBe(0);
            expect(basePubSub.clientId).toBe('testId');
            expect(basePubSub.lastEventNotified).toBe('');
        });
    });

    describe('register function tests', () => {

        it('Should add new subscriber with the sent url to subscribers array ' +
            'when calling register function with url', () => {
            basePubSub.register(testSub, testWindow, testSubUrl);

            let actualSub = basePubSub.subscribers.get(testSub);

            expect(basePubSub.subscribers.size).toBe(1);
            expect(actualSub.window).toBe(testWindow);
            expect(actualSub.locationUrl).toBe(testSubUrl);
        });

        it('Should add new subscriber with the window location.href to subscribers array ' +
            'when calling register function without url', () => {
            basePubSub.register(testSub, testWindow, undefined);

            let actualSub = basePubSub.subscribers.get(testSub);

            expect(basePubSub.subscribers.size).toBe(1);
            expect(actualSub.window).toBe(testWindow);
            expect(actualSub.locationUrl).toBe(window.location.href);
        });
    });

    describe('unregister function tests', () => {

        it('Should remove subscriber from subscribers list', () => {
            basePubSub.register(testSub, testWindow, testSubUrl);

            expect(basePubSub.subscribers.size).toBe(1);

            basePubSub.unregister(testSub);

            expect(basePubSub.subscribers.size).toBe(0);
        });
    });

    describe('on function tests', () => {
        let callback = () => {return true};

        it('Should add new callback to events callback array', () => {
            basePubSub.on(callback);

            expect(basePubSub.eventsCallbacks.length).toBe(1);

            let actualCallback = basePubSub.eventsCallbacks[0];

            expect(actualCallback).toBe(callback);
        });

        it('Should not add callback to events callback array if it already exists', () => {
            basePubSub.on(callback);

            expect(basePubSub.eventsCallbacks.length).toBe(1);

            basePubSub.on(callback);

            expect(basePubSub.eventsCallbacks.length).toBe(1);
        });
    });

    describe('off function tests', () => {
        let callback = () => {return true};

        it('Should remove callback from events callback array', () => {
            basePubSub.on(callback);

            expect(basePubSub.eventsCallbacks.length).toBe(1);

            basePubSub.off(callback);

            expect(basePubSub.eventsCallbacks.length).toBe(0);
        });
    });

    describe('isWaitingForEvent function tests', () => {
        let eventsMap = new Map<string, Array<string>>();
        eventsMap.set('eventsKey', ['WINDOW_OUT']);

        beforeEach(() => {
            basePubSub.eventsToWait = eventsMap;
        });

        it('Should return true when the event is found in the events to wait array', () => {
            let isWaiting = basePubSub.isWaitingForEvent('WINDOW_OUT');

            expect(isWaiting).toBeTruthy();
        });

        it('Should return false when the event is not found in the events to wait array', () => {
            let isWaiting = basePubSub.isWaitingForEvent('CHECK_IN');

            expect(isWaiting).toBeFalsy();
        });
    });

    describe('notify function tests', () => {
        let eventType: string = 'CHECK_IN';
        let callback;
        beforeEach(() => {
             callback = jest.fn();
        });

        it('should only update the last event notified property when no subscribers registered', () => {
            basePubSub.notify(eventType);

            expect(basePubSub.lastEventNotified).toBe(eventType);
        });

        it('should call post message with the right parameters when there are subscribers registered', () => {
            testWindow.postMessage = jest.fn();
            basePubSub.register(testSub, testWindow, testSubUrl);
            basePubSub.notify(eventType);

            let sub = basePubSub.subscribers.get(testSub);

            let eventObj = {
                type: eventType,
                data: undefined,
                originId: basePubSub.clientId
            };

            expect(sub.window.postMessage).toHaveBeenCalledWith(eventObj, sub.locationUrl);
        });

        it('should execute the callback function when calling notify with subscription function with no subscribers', () => {
            let callback = jest.fn();

            basePubSub.notify(eventType).subscribe(callback);

            expect(callback).toHaveBeenCalled();
        });

        it('should execute the callback function when calling notify with subscription function ' +
            'with connected subscribers after all been notified', () => {
            basePubSub.register(testSub, testWindow, testSubUrl);

            basePubSub.notify(eventType).subscribe(callback);

            expect(callback).toHaveBeenCalled();
        });

        it('should register an action completed function to pub sub when an event that is in the events to wait list ' +
            'is being fired', () => {
            let eventsMap = new Map<string, Array<string>>();
            eventsMap.set(testSub, ['CHECK_IN']);
            basePubSub.on = jest.fn();

            basePubSub.register(testSub, testWindow, testSubUrl);
            basePubSub.eventsToWait = eventsMap;

            basePubSub.notify(eventType).subscribe(callback);

            expect(basePubSub.on).toHaveBeenCalled();
        });
    })
});