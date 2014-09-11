import AboutPageModel = require('AboutPageModel');
import View = require('View');
import AboutPageBase = require('AboutPageBase');
import ListViewExample = require('ListViewExample');
import Persona = require('Persona');
import DomUtils = require('DomUtils');
import AboutPagecss = require('AboutPage.css');

DomUtils.loadStyles(AboutPagecss.styles);

class AboutPage extends AboutPageBase {
    viewName = 'AboutPage';
    viewModelType = AboutPageModel;
    listViewExample = <any>this.addChild(new ListViewExample());
    personaExample = <any>this.addChild(new Persona());

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("div", ["class","c-AboutPage page"], null, [
            _this._ce("h1", [], null, [
                _this._ct("OneJS controls playground.")
            ]),
            _this.listViewExample.render(),
            _this.personaExample.render()
        ]));
    }
}

export = AboutPage;
