import NavBarModel = require('./NavBarModel');
import NavBarBase = require('./NavBarBase');
import Repeater = require('../onejs/Repeater');
import DomUtils = require('../onejs/DomUtils');
import NavBarcss = require('./NavBar.css');

DomUtils.loadStyles(NavBarcss.styles);

class NavBarBlock0Item extends View {
    viewName = 'NavBarBlock0Item';

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("li", ["class","ms-NavBar-item"], bindings[0]));
    }

    _bindings = [
        {
            "id": "0",
            "text": "command.text"
        }
    ];
}

class NavBarBlock0 extends Repeater {
    viewName = 'NavBarBlock0';
    childViewType = NavBarBlock0Item;
    itemName = "command";

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("ul", ["class","ms-NavBar-items"], bindings[0], this.getChildElements()));
    }

    _bindings = [
        {
            "id": "0",
            "childId": "surface"
        }
    ];
}

class NavBar extends NavBarBase {
    viewName = 'NavBar';
    viewModelType = NavBarModel;
    navBarBlock0 = <any>this.addChild(new NavBarBlock0());

    onInitialize() {
        super.onInitialize();
        this.navBarBlock0.owner = this;
    }

    onViewModelChanged() {
        super.onViewModelChanged();
        this.navBarBlock0.setData({ items: this.getValue('commands') });
    }

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("div", ["class","ms-NavBar"], null, [
            _this.navBarBlock0.render()
        ]));
    }
}

export = NavBar;
