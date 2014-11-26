import LeftNavModel = require('./LeftNavModel');
import View = require('onejs/View');
import DomUtils = require('onejs/DomUtils');
import LeftNavBase = require('./LeftNavBase');
import Baz = require('./Baz');
import Boz = require('./Boz');
import SearchBox = require('./SearchBox');
import ImageButton = require('../ImageButton/ImageButton');
import QuotaPane = require('./QuotaPane');
import LeftNavcss = require('./LeftNav.css');

DomUtils.loadStyles(LeftNavcss.styles);

class LeftNav extends LeftNavBase {
    viewName = 'LeftNav';
    viewModelType = LeftNavModel;
    _childView0 = <any>this.addChild(new Baz());
    _childView1 = <any>this.addChild(new Boz());
    _childView2 = <any>this.addChild(new SearchBox());
    expandButton = <any>this.addChild(new ImageButton());
    _childView3 = <any>this.addChild(new QuotaPane());

    onViewModelChanged(viewModel, args?: any) {
        super.onViewModelChanged(viewModel, args);
        this.expandButton.setData(this.getValue('$owner.expandButtonModel'));
    }

    _spec = <any> {
        "type": 0,
        "tag": "div",
        "attr": {
            "class": "c-LeftNavBar"
        },
        "children": [
            {
                "type": 6,
                "name": "_childView0",
                "children": []
            },
            {
                "type": 6,
                "name": "_childView1",
                "children": []
            },
            {
                "type": 0,
                "tag": "div",
                "attr": {
                    "class": "searchArea"
                },
                "children": [
                    {
                        "type": 6,
                        "name": "_childView2",
                        "children": []
                    }
                ]
            },
            {
                "type": 0,
                "tag": "div",
                "attr": {
                    "class": "scrollArea"
                },
                "children": [
                    {
                        "type": 0,
                        "tag": "table",
                        "attr": {
                            "class": "ms-leftnav-table",
                            "cellpadding": "0",
                            "cellspacing": "0"
                        },
                        "children": [
                            {
                                "type": 0,
                                "tag": "tr",
                                "attr": {
                                    "valign": "top"
                                },
                                "children": [
                                    {
                                        "type": 0,
                                        "tag": "td",
                                        "children": [
                                            {
                                                "type": 0,
                                                "tag": "div",
                                                "attr": {
                                                    "class": "linkArea"
                                                },
                                                "children": [
                                                    {
                                                        "type": 5,
                                                        "source": "linkGroups",
                                                        "iterator": "group",
                                                        "children": [
                                                            {
                                                                "type": 0,
                                                                "tag": "div",
                                                                "attr": {
                                                                    "class": "linkGroup"
                                                                },
                                                                "children": [
                                                                    {
                                                                        "type": 5,
                                                                        "source": "group.links",
                                                                        "iterator": "link",
                                                                        "children": [
                                                                            {
                                                                                "type": 0,
                                                                                "tag": "div",
                                                                                "binding": {
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
                                                                                "children": [
                                                                                    {
                                                                                        "type": 6,
                                                                                        "name": "expandButton",
                                                                                        "children": []
                                                                                    },
                                                                                    {
                                                                                        "type": 0,
                                                                                        "tag": "a",
                                                                                        "attr": {
                                                                                            "class": "link ms-font-l"
                                                                                        },
                                                                                        "binding": {
                                                                                            "id": "1",
                                                                                            "className": {
                                                                                                "isSelected": "$parent.isSelected(link)"
                                                                                            },
                                                                                            "attr": {
                                                                                                "href": "link.url"
                                                                                            },
                                                                                            "text": "link.text"
                                                                                        },
                                                                                        "children": []
                                                                                    },
                                                                                    {
                                                                                        "type": 0,
                                                                                        "tag": "div",
                                                                                        "attr": {
                                                                                            "class": "subLinks"
                                                                                        },
                                                                                        "children": [
                                                                                            {
                                                                                                "type": 5,
                                                                                                "source": "link.links",
                                                                                                "iterator": "link",
                                                                                                "children": [
                                                                                                    {
                                                                                                        "type": 0,
                                                                                                        "tag": "a",
                                                                                                        "attr": {
                                                                                                            "class": "sub link ms-font-s"
                                                                                                        },
                                                                                                        "binding": {
                                                                                                            "id": "2",
                                                                                                            "className": {
                                                                                                                "isSelected": "$parent.isSelected(link)"
                                                                                                            },
                                                                                                            "attr": {
                                                                                                                "href": "link.url"
                                                                                                            },
                                                                                                            "text": "link.text"
                                                                                                        },
                                                                                                        "children": []
                                                                                                    }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": 0,
                                "tag": "tr",
                                "attr": {
                                    "valign": "bottom"
                                },
                                "children": [
                                    {
                                        "type": 0,
                                        "tag": "td",
                                        "children": [
                                            {
                                                "type": 6,
                                                "name": "_childView3",
                                                "children": []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
}

export = LeftNav;
