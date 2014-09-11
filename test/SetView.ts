import SetViewModel = require('SetViewModel');
import View = require('View');
import Header = require('Header');
import LeftNav = require('LeftNav');
import SetHeader = require('SetHeader');
import ListView = require('ListView');
import InfoPane = require('InfoPane');
import DomUtils = require('DomUtils');
import SetViewcss = require('SetView.css');

DomUtils.loadStyles(SetViewcss.styles);

class SetView extends View {
    viewName = 'SetView';
    viewModelType = SetViewModel;
    header = <any>this.addChild(new Header());
    leftNav = <any>this.addChild(new LeftNav());
    setHeader = <any>this.addChild(new SetHeader());
    listView = <any>this.addChild(new ListView());
    infoPane = <any>this.addChild(new InfoPane());

    onViewModelChanged() {
        super.onViewModelChanged();
        this.listView.setData({ viewportClass: this.getValue(''od-setview-listview''), items: this.getValue('listItems'), layout: this.getValue('currentLayout') });
    }

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("div", ["class","od-setview"], bindings[0], [
            _this.header.render(),
            _this._ce("div", ["class","od-setview-leftnav"], null, [
                _this.leftNav.render()
            ]),
            _this._ce("div", ["class","od-setview-content"], null, [
                _this.setHeader.render(),
                _this._ce("div", ["class","od-setview-listview"], null, [
                    _this.listView.render()
                ]),
                _this._ce("div", ["class","od-setview-infopane"], null, [
                    _this.infoPane.render()
                ])
            ])
        ]));
    }

    _bindings = [
        {
            "id": "0",
            "className": {
                "infoPaneExpanded": "isInfoPaneExpanded"
            }
        }
    ];
}

export = SetView;
