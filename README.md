## sdc-pubsub

sdc-pubsub [npm](https://www.npmjs.com/package/sdc-pubsub) package.

### Installation

Installing using npm:

```
npm install sdc-pubsub
```

### Loading It Up
#### ES6
```javascript
import {PluginPubSub} from 'sdc-pubsub'
```
#### ES5

```javascript
var pluginPubSub = require('PluginPubSub')
```

### Usage
#### Initialize a pubsub client
```javascript
//eventsClientId=<received from query params>
//parentUrl=<received from query params>
//eventsToWaitFor = [ “CHECK_IN” ]

var client = new PluginPubSub('eventsClientId, parentUrl, eventsToWaitFor')
```

#### Notify about events
```javascript
client.notify(“READY”)
```

#### Register for an event
```javascript
client.on((eventData,event) => {
      if(eventData.type == ”WINDOW_OUT”) {
		             //do logic
       }
   }
)
```

### Dependencies

* None.

### Tests

None.

### Authors

* Idan Amit: [https://wiki.onap.org/display/~idanamit](hhttps://wiki.onap.org/display/~idanamit)


### Links

sdc onap wiki [https://wiki.onap.org/x/_TX0](https://wiki.onap.org/x/_TX0)

### License

Copyright 2018 AT&T, Inc.

Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
