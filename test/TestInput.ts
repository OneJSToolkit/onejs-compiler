import LeftNavModel = require('LeftNavModel');
import View = require('View');
import ImageSprite = require('ImageSprite');
import Repeater = require('Repeater');
import DomUtils = require('DomUtils');
import LeftNavcss = require('LeftNav.css');

DomUtils.loadStyles(LeftNavcss.styles);

class LeftNavBlock2Item extends View {
    viewName = 'LeftNavBlock2Item';

    onRenderElement(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("a", ["class","sub link"], bindings[0]));
    }

    _bindings = [
        {
            "id": "0",
            "className": {
                "isSelected": "$parent.isSelected"
            },
            "attr": {
                "href": "link.url"
            },
            "text": "link.text"
        }
    ];
}

class LeftNavBlock2 extends Repeater {
    viewName = 'LeftNavBlock2';
    childViewType = LeftNavBlock2Item;
    itemName = "link";

    onRenderElement(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("div", [], bindings[0], this.getChildElements()));
    }

    _bindings = [
        {
            "id": "0",
            "childId": "surface"
        }
    ];
}

class LeftNavBlock1Item extends View {
    viewName = 'LeftNavBlock1Item';
    leftNavBlock2 = <any>this.addChild(new LeftNavBlock2());

    onInitialize() {
        super.onInitialize();
        this.leftNavBlock2.owner = this.owner;
    }

    onViewModelChanged() {
        super.onViewModelChanged();
        this.leftNavBlock2.setData({ items: this.getValue('link.links') });
    }

    onRenderElement(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("a", ["class","link"], bindings[0]),
        return (_this.element = _this.leftNavBlock2.renderElement());
    }

    _bindings = [
        {
            "id": "0",
            "className": {
                "isSelected": "$parent.isSelected"
            },
            "attr": {
                "href": "link.url"
            },
            "text": "link.text"
        }
    ];
}

class LeftNavBlock1 extends Repeater {
    viewName = 'LeftNavBlock1';
    childViewType = LeftNavBlock1Item;
    itemName = "link";

    onRenderElement(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("div", ["class","linkGroup"], bindings[0], this.getChildElements()));
    }

    _bindings = [
        {
            "id": "0",
            "childId": "surface"
        }
    ];
}

class LeftNavBlock0Item extends View {
    viewName = 'LeftNavBlock0Item';
    leftNavBlock1 = <any>this.addChild(new LeftNavBlock1());

    onInitialize() {
        super.onInitialize();
        this.leftNavBlock1.owner = this.owner;
    }

    onViewModelChanged() {
        super.onViewModelChanged();
        this.leftNavBlock1.setData({ items: this.getValue('group.links') });
    }

    onRenderElement(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this.leftNavBlock1.renderElement());
    }
}

class LeftNavBlock0 extends Repeater {
    viewName = 'LeftNavBlock0';
    childViewType = LeftNavBlock0Item;
    itemName = "group";

    onRenderElement(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("div", ["class","linkArea"], bindings[0], this.getChildElements()));
    }

    _bindings = [
        {
            "id": "0",
            "childId": "surface"
        }
    ];
}

class LeftNav extends View {
    viewName = 'LeftNav';
    viewModelType = LeftNavModel;
    searchIcon = <any>this.addChild(new ImageSprite());
    leftNavBlock0 = <any>this.addChild(new LeftNavBlock0());

    onInitialize() {
        super.onInitialize();
        this.leftNavBlock0.owner = this;
    }

    onViewModelChanged() {
        super.onViewModelChanged();
        this.searchIcon.setData(this.getValue('searchIcon'));
        this.leftNavBlock0.setData({ items: this.getValue('linkGroups') });
    }

    onRenderElement(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("div", ["class","c-LeftNavBar"], null, [
            _this._ce("div", ["class","searchBox"], null, [
                _this._ce("span", [], bindings[0]),
                _this.searchIcon.renderElement()
            ]),
            _this._ce("div", ["class","scrollArea"], null, [
                _this.leftNavBlock0.renderElement(),
                _this._ce("div", ["class","c-QuotaPane"], null, [
                    _this._ce("div", ["class","quota"], null, [
                        _this._ct("37.4GB available")
                    ]),
                    _this._ce("a", ["class","link","href","#"], bindings[1], [
                        _this._ct("Recycle bin")
                    ]),
                    _this._ce("a", ["class","link","href","#"], bindings[2], [
                        _this._ct("Manage storage")
                    ]),
                    _this._ce("a", ["class","link","href","#"], bindings[3], [
                        _this._ct("Get SkyDrive apps")
                    ])
                ])
            ])
        ]));
    }

    _bindings = [
        {
            "id": "0",
            "text": "searchText"
        },
        {
            "id": "1",
            "events": {
                "click": [
                    "$toggle(foo)"
                ]
            }
        },
        {
            "id": "2",
            "className": {
                "isRed": "foo"
            }
        },
        {
            "id": "3",
            "className": {
                "isRed": "foo"
            }
        }
    ];
}

export = LeftNav;
