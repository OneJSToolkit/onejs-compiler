import LeftNavModel = require('./LeftNavModel');
import View = require('../onejs/View');
import DomUtils = require('../onejs/DomUtils');
import LeftNavBase = require('./LeftNavBase');
import Baz = require('../Baz/Baz');
import Boz = require('../Boz/Boz');
import SearchBox = require('../SearchBox/SearchBox');
import Repeater = require('../onejs/Repeater');
import QuotaPane = require('../QuotaPane/QuotaPane');
import ImageButton = require('../ImageButton/ImageButton');
import LeftNavcss = require('./LeftNav.css');

DomUtils.loadStyles(LeftNavcss.styles);

class LeftNav extends LeftNavBase {
    viewName = 'LeftNav';
    viewModelType = LeftNavModel;
    _childView0 = <any>this.addChild(new Baz());
    _childView1 = <any>this.addChild(new Boz());
    _childView2 = <any>this.addChild(new SearchBox());
    leftNavBlock0 = <any>this.addChild(new LeftNavBlock0());
    _childView3 = <any>this.addChild(new QuotaPane());

    onInitialize() {
        super.onInitialize();
        this.leftNavBlock0.owner = this;
    }

    onViewModelChanged(viewModel, args?: any) {
        super.onViewModelChanged(viewModel, args);
        this.leftNavBlock0.setData({ items: this.getValue('linkGroups') });
    }

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = DomUtils.ce("div", ["class","c-LeftNavBar"], [
            _this._childView0.render(),
            _this._childView1.render(),
            DomUtils.ce("div", ["class","searchArea"], [
                _this._childView2.render()
            ]),
            DomUtils.ce("div", ["class","scrollArea"], [
                DomUtils.ce("table", ["class","ms-leftnav-table","cellpadding","0","cellspacing","0"], [
                    DomUtils.ce("tr", ["valign","top"], [
                        DomUtils.ce("td", [], [
                            _this.leftNavBlock0.render()
                        ])
                    ]),
                    DomUtils.ce("tr", ["valign","bottom"], [
                        DomUtils.ce("td", [], [
                            _this._childView3.render()
                        ])
                    ])
                ])
            ])
        ]));
    }
}

class LeftNavBlock0Item extends View {
    viewName = 'LeftNavBlock0Item';
    leftNavBlock1 = <any>this.addChild(new LeftNavBlock1());

    onInitialize() {
        super.onInitialize();
        this.leftNavBlock1.owner = this.owner;
    }

    onViewModelChanged(viewModel, args?: any) {
        super.onViewModelChanged(viewModel, args);
        this.leftNavBlock1.setData({ items: this.getValue('group.links') });
    }

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this.leftNavBlock1.render());
    }
}

class LeftNavBlock1Item extends View {
    viewName = 'LeftNavBlock1Item';
    expandButton = <any>this.addChild(new ImageButton());
    leftNavBlock2 = <any>this.addChild(new LeftNavBlock2());

    onInitialize() {
        super.onInitialize();
        this.leftNavBlock2.owner = this.owner;
    }

    onViewModelChanged(viewModel, args?: any) {
        super.onViewModelChanged(viewModel, args);
        this.expandButton.setData(this.getValue('$owner.expandButtonModel'));
        this.leftNavBlock2.setData({ items: this.getValue('link.links') });
    }

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = DomUtils.ce("div", [], [
            _this.expandButton.render(),
            DomUtils.ce("a", ["class","link ms-font-l"], [], bindings[1]),
            _this.leftNavBlock2.render()
        ], bindings[0]));
    }

    _bindings = [
        {
            "id": "0",
            "className": {
                "isExpanded": "link.isExpanded"
            },
            "events": {
                "$view.expandButtonClicked": [
                    "$view.toggle('link.isExpanded')"
                ]
            }
        },
        {
            "id": "1",
            "className": {
                "isSelected": "$parent.isSelected(link)"
            },
            "attr": {
                "href": "link.url"
            },
            "text": "link.text"
        }
    ];
}

class LeftNavBlock2Item extends View {
    viewName = 'LeftNavBlock2Item';

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = DomUtils.ce("a", ["class","sub link ms-font-s"], [], bindings[0]));
    }

    _bindings = [
        {
            "id": "0",
            "className": {
                "isSelected": "$parent.isSelected(link)"
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

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = DomUtils.ce("div", ["class","subLinks"], this.getChildElements(), bindings[0]));
    }

    _bindings = [
        {
            "id": "0",
            "childId": "surface"
        }
    ];
}

class LeftNavBlock1 extends Repeater {
    viewName = 'LeftNavBlock1';
    childViewType = LeftNavBlock1Item;
    itemName = "link";

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = DomUtils.ce("div", ["class","linkGroup"], this.getChildElements(), bindings[0]));
    }

    _bindings = [
        {
            "id": "0",
            "childId": "surface"
        }
    ];
}

class LeftNavBlock0 extends Repeater {
    viewName = 'LeftNavBlock0';
    childViewType = LeftNavBlock0Item;
    itemName = "group";

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = DomUtils.ce("div", ["class","linkArea"], this.getChildElements(), bindings[0]));
    }

    _bindings = [
        {
            "id": "0",
            "childId": "surface"
        }
    ];
}

export = LeftNav;
