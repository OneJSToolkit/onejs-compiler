import HeaderModel = require('HeaderModel');
import View = require('View');
import Repeater = require('Repeater');
import ImageSprite = require('ImageSprite');
import Headercss = require('Header.css');

View.loadStyles(Headercss.styles);

class Header1Block0Item extends View {
    viewName = 'Header1Block0Item';
    private iconImage: ImageSprite = <ImageSprite>this.addChild(new ImageSprite());
    private chevronImage: ImageSprite = <ImageSprite>this.addChild(new ImageSprite());

    onViewModelChanged() {
        this.iconImage.setData(this.getValue('image'));
        this.chevronImage.setData(this.getValue('chevron'));
    }

    onRenderHtml(): string {
        return '' +
            '<a class="command" href="#">' +
                this.iconImage.renderHtml() +
                '<span id="' + this.id + '_0" class="text">' +
                    this.genText('text') +
                '</span>' +
                this.chevronImage.renderHtml() +
            '</a>' +
            '';
    }

    _bindings = [
        {
            "id": "0",
            "text": "text"
        }
    ];
}

class Header1Block0 extends Repeater {
    viewName = 'Header1Block0';
    childViewType = Header1Block0Item;
    itemName = "command";

    onRenderHtml(): string {
        return '' +
            '<div id="' + this.id + '_0" class="commandBar">' +
                this.renderItems() + 
            '</div>' +
            '';
    }

    _bindings = [
        {
            "id": "0",
            "childId": "surface"
        }
    ];
}

class Header1 extends View {
    viewName = 'Header1';
    viewModelType = HeaderModel;
    private header1Block0: Header1Block0 = <Header1Block0>this.addChild(new Header1Block0());

    onViewModelChanged() {
        this.header1Block0.setData({ items: this.getValue('commands') });
    }

    onRenderHtml(): string {
        return '' +
            '<div class="c-Header">' +
                this.header1Block0.renderHtml() +
            '</div>' +
            '';
    }
}

export = Header1;
