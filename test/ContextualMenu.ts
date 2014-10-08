import ContextualMenuModel = require('./ContextualMenuModel');
import TemplatedView = require('../onejs/TemplatedView');
import DomUtils = require('../onejs/DomUtils');
import ContextualMenuBase = require('./ContextualMenuBase');
import Repeater = require('../onejs/Repeater');

class ContextualMenu extends ContextualMenuBase {
    viewName = 'ContextualMenu';
    viewModelType = ContextualMenuModel;
    contextualMenuBlock0 = <any>this.addChild(new ContextualMenuBlock0());

    onInitialize() {
        super.onInitialize();
        this.contextualMenuBlock0.owner = this;
    }

    onViewModelChanged(viewModel, args?: any) {
        super.onViewModelChanged(viewModel, args);
        this.contextualMenuBlock0.setData({ items: this.getValue('items') });
    }

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this.contextualMenuBlock0.render());
    }
}

class ContextualMenuBlock0Item extends TemplatedView {
    viewName = 'ContextualMenuBlock0Item';

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = DomUtils.ce("li", ["class","ms-ContextualMenu-item"], [], bindings[0])););
    }

    _bindings = [
        {
            "id": "0",
            "attr": {
                "class": "$owner.getMenuItemClassString(index)"
            },
            "text": "item.text"
        }
    ];
}

class ContextualMenuBlock0 extends Repeater {
    viewName = 'ContextualMenuBlock0';
    childViewType = ContextualMenuBlock0Item;
    itemName = "item";

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = DomUtils.ce("ul", ["class","ms-ContextualMenu"], this.getChildElements(), bindings[0])););
    }

    _bindings = [
        {
            "id": "0",
            "childId": "surface"
        }
    ];
}

export = ContextualMenu;
