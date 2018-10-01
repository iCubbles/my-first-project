## my-first-webpackage
Webpackage to demonstrate the use of Cubbles components
### Webpackage Artifacts
| Name | Type | Description | Links |
|---|---|---|---|
| **docs** | Application | Generated webpackage documentation. | [docs](https://cubbles.world/sandbox/my-first-webpackage@0.1.0-SNAPSHOT/docs/index.html) |
| **currency-converter** | Elementary Component | Elementary that uses an api to Convert currencies | [demo](https://cubbles.world/sandbox/my-first-webpackage@0.1.0-SNAPSHOT/currency-converter/demo/index.html) [docs](https://cubbles.world/sandbox/my-first-webpackage@0.1.0-SNAPSHOT/currency-converter/docs/index.html) |
| **currency-viewer** | Compound Component | Component to display currency differences in a bar-chart | [demo](https://cubbles.world/sandbox/my-first-webpackage@0.1.0-SNAPSHOT/currency-viewer/demo/index.html) [docs](https://cubbles.world/sandbox/my-first-webpackage@0.1.0-SNAPSHOT/currency-viewer/docs/index.html) |
| **currency-viewer-init** | Compound Component | Component to display currency differences in a bar-chart, with initialisation | [demo](https://cubbles.world/sandbox/my-first-webpackage@0.1.0-SNAPSHOT/currency-viewer-init/demo/index.html) [docs](https://cubbles.world/sandbox/my-first-webpackage@0.1.0-SNAPSHOT/currency-viewer-init/docs/index.html) |
### Use of components
The html file should contain the desire component using its tag, e.g. the `<currency-converter>`, as follows:
```html
<currency-converter cubx-webpackage-id="my-first-webpackage@0.1.0-SNAPSHOT"></currency-converter>
```
Note that the `webpackageId` should be provided as attribute, which in this case is: `my-first-webpackage@0.1.0-SNAPSHOT`.

Additionally, this component can be initialized using the `<cubx-core-slot-init>` tag (available from _cubx.core.rte@1.9.0_).
For example, lets initialize the `base` slot to get the basic package of ckeditor:

```html
<currency-converter cubx-webpackage-id="my-first-webpackage@0.1.0-SNAPSHOT">
    <!--Initilization-->
    <cubx-core-init style="display:none">
        <cubx-core-slot-init slot="base">"EUR"</cubx-core-slot-init>
    </cubx-core-init>
</currency-converter>
```

Or it can be initialized and later manipulated from Javascript as follows:

```javascript
var component= document.querySelector('currency-converter');
// Wait until CIF is ready
document.addEventListener('cifReady', function() {
  // Manipulate slots
  component.setBase("EUR");
});
```

[Want to get to know the Cubbles Platform?](https://cubbles.github.io)