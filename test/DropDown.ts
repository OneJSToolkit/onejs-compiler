import DropDownModel = require('./DropDownModel');
import View = require('../onejs/View');
import DomUtils = require('../onejs/DomUtils');
import DropDownBase = require('./DropDownBase');
import Repeater = require('../onejs/Repeater');
import DropDowncss = require('./DropDown.css');

DomUtils.loadStyles(DropDowncss.styles);

class DropDown extends DropDownBase {
    viewName = 'DropDown';
    viewModelType = DropDownModel;
    dropDownBlock0 = <any>this.addChild(new DropDownBlock0());

    onInitialize() {
        super.onInitialize();
        this.dropDownBlock0.owner = this;
    }

    onViewModelChanged(viewModel, args?: any) {
        super.onViewModelChanged(viewModel, args);
        this.dropDownBlock0.setData({ items: this.getValue('options') });
    }

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = DomUtils.ce("div", ["class","DropDown"], [
            DomUtils.ce("span", ["class","DropDown-item"], [], bindings[1]),
            _this.dropDownBlock0.render()
        ], bindings[0]));
    }

    _bindings = [
        {
            "id": "0",
            "className": {
                "isExpanded": "isExpanded"
            }
        },
        {
            "id": "1",
            "text": "selectedItem.name",
            "events": {
                "click": [
                    "$view._onMouseClick"
                ]
            }
        }
    ];
}

class DropDownBlock0Item extends View {
    viewName = 'DropDownBlock0Item';

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = DomUtils.ce("li", ["class","DropDown-item"], [], bindings[0]));
    }

    _bindings = [
        {
            "id": "0",
            "className": {
                "isSelected": "$parent.isSelected(option)"
            },
            "text": "option.name",
            "events": {
                "click": [
                    "$owner._onItemClicked(option)"
                ]
            }
        }
    ];
}

class DropDownBlock0 extends Repeater {
    viewName = 'DropDownBlock0';
    childViewType = DropDownBlock0Item;
    itemName = "option";

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = DomUtils.ce("ul", ["class","DropDown-menu"], this.getChildElements(), bindings[0]));
    }

    _bindings = [
        {
            "id": "0",
            "childId": "surface"
        }
    ];
}

export = DropDown;
