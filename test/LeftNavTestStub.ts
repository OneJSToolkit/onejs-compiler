import ViewTestStub = require('./onejs/ViewTestStub');
import LeftNavBaseTestStub = require('./LeftNavBaseTestStub');
import GetSubControlLocation = require('../onejs/GetSubControlLocation');
import BazTestStub = require('./BazTestStub');
import BozTestStub = require('./BozTestStub');
import SearchBoxTestStub = require('./SearchBoxTestStub');
import ImageButtonTestStub = require('../ImageButton/ImageButtonTestStub');
import QuotaPaneTestStub = require('./QuotaPaneTestStub');

class LeftNavTestStub extends ViewTestStub {
    originalViewName = 'LeftNav';
    _childView0(): BazTestStub {
        return new BazTestStub(new GetSubControlLocation('_childView0', this.controlLocation, this.webDriver), this.webDriver);
    }
    _childView1(): BozTestStub {
        return new BozTestStub(new GetSubControlLocation('_childView1', this.controlLocation, this.webDriver), this.webDriver);
    }
    _childView2(): SearchBoxTestStub {
        return new SearchBoxTestStub(new GetSubControlLocation('_childView2', this.controlLocation, this.webDriver), this.webDriver);
    }
    expandButton(): ImageButtonTestStub {
        return new ImageButtonTestStub(new GetSubControlLocation('expandButton', this.controlLocation, this.webDriver), this.webDriver);
    }
    _childView3(): QuotaPaneTestStub {
        return new QuotaPaneTestStub(new GetSubControlLocation('_childView3', this.controlLocation, this.webDriver), this.webDriver);
    }
    link_isExpanded_State<T>() {
        return this.getState<T>('link.isExpanded');
    }
    $parent_isSelected(link)_State<T>() {
        return this.getState<T>('$parent.isSelected(link)');
    }
    link_url_State<T>() {
        return this.getState<T>('link.url');
    }
    link_text_State<T>() {
        return this.getState<T>('link.text');
    }
    $parent_isSelected(link)_State<T>() {
        return this.getState<T>('$parent.isSelected(link)');
    }
    link_url_State<T>() {
        return this.getState<T>('link.url');
    }
    link_text_State<T>() {
        return this.getState<T>('link.text');
    }
}

export = LeftNavTestStub;
