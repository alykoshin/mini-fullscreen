To build an example:
1. Install `browserify`:
```bash
  npm install -g browserify
```
2. Install dependencies:
```bash
  npm install
```
3. Build
```bash
  npm run browserify
```
4. Open `./index.html` in your broser

After making changes in `./src/index.js` please do not forget to rebuild the bundle (`./build/bundle.js`) by using
```bash
  npm run browserify
```
and refresh the browser.
