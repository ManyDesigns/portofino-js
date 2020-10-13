# Portofino JS
Run this
``` bash
npm i --save @manydesigns/portofino
```
Put that in the main js file
``` JavaScript
import Portofino from '@manydesigns/portofino';
Portofino.connect({
    url: 'http://localhost:8080/api', //Optional, default: '/api'
});
```
Done, now it should work 😁
## Get an action
``` JavaScript
Portofino.getAction('action-name').then(action => {
  //
});
```