///<reference path="../TestBase/source/definitions/selenium-webdriver.d.ts" />
import BaseControl = require('../TestBase/source/baseControl');
export class SetView extends BaseControl.JBaseBaseControl {
    static controlName = 'SkyDrive.UI.SetView';
    static controlShortName = 'SetView';
    constructor(controlLocation: BaseControl.IControlLocation, webDriver: webdriver.WebDriver) {
        super(controlLocation, webDriver, SetView.controlName);
    }
    root_mousedown() {
        return this.executeUserAction('root', 'mousedown');
    }
    root_mousemove() {
        return this.executeUserAction('root', 'mousemove');
    }
    root_mouseup() {
        return this.executeUserAction('root', 'mouseup');
    }
    pageHeader<T>(construct: { new (controlLocation: BaseControl.IControlLocation, webDriver: webdriver.WebDriver): T; }): T {
        return new construct(new BaseControl.GetSubControlLocation('pageHeader', this.controlLocation, this.webDriver), this.webDriver);
    }
    showNavPaneState<T>() {
        return this.getState<T>('showNavPane');
    }
    isInfoPaneAvailableState<T>() {
        return this.getState<T>('isInfoPaneAvailable');
    }
    selectByDefaultState<T>() {
        return this.getState<T>('selectByDefault');
    }
    isSetHeaderVisibleState<T>() {
        return this.getState<T>('isSetHeaderVisible');
    }
    notificationBar<T>(construct: { new (controlLocation: BaseControl.IControlLocation, webDriver: webdriver.WebDriver): T; }): T {
        return new construct(new BaseControl.GetSubControlLocation('notificationBar', this.controlLocation, this.webDriver), this.webDriver);
    }
    searchContainerElement() {
        return this.getElementFromControlId('searchContainer');
    }
    searchbox<T>(construct: { new (controlLocation: BaseControl.IControlLocation, webDriver: webdriver.WebDriver): T; }): T {
        return new construct(new BaseControl.GetSubControlLocation('searchbox', this.controlLocation, this.webDriver), this.webDriver);
    }
    leftNavBar<T>(construct: { new (controlLocation: BaseControl.IControlLocation, webDriver: webdriver.WebDriver): T; }): T {
        return new construct(new BaseControl.GetSubControlLocation('leftNavBar', this.controlLocation, this.webDriver), this.webDriver);
    }
    businessPane<T>(construct: { new (controlLocation: BaseControl.IControlLocation, webDriver: webdriver.WebDriver): T; }): T {
        return new construct(new BaseControl.GetSubControlLocation('businessPane', this.controlLocation, this.webDriver), this.webDriver);
    }
    quotaPane<T>(construct: { new (controlLocation: BaseControl.IControlLocation, webDriver: webdriver.WebDriver): T; }): T {
        return new construct(new BaseControl.GetSubControlLocation('quotaPane', this.controlLocation, this.webDriver), this.webDriver);
    }
    rootItemState<T>() {
        return this.getState<T>('rootItem');
    }
    headerElement() {
        return this.getElementFromControlId('header');
    }
    isTextEditorModeState<T>() {
        return this.getState<T>('isTextEditorMode');
    }
    textFileEditorState<T>(construct: { new (controlLocation: BaseControl.IControlLocation, webDriver: webdriver.WebDriver): T; }): T {
        return new construct(new BaseControl.GetSubControlLocation('textFileEditorState', this.controlLocation, this.webDriver), this.webDriver);
    }
    showRecycledItemsMenuState<T>() {
        return this.getState<T>('showRecycledItemsMenu');
    }
    recycledItemsMenu<T>(construct: { new (controlLocation: BaseControl.IControlLocation, webDriver: webdriver.WebDriver): T; }): T {
        return new construct(new BaseControl.GetSubControlLocation('recycledItemsMenu', this.controlLocation, this.webDriver), this.webDriver);
    }
    showTagFilterMenuState<T>() {
        return this.getState<T>('showTagFilterMenu');
    }
    tagFilterMenu<T>(construct: { new (controlLocation: BaseControl.IControlLocation, webDriver: webdriver.WebDriver): T; }): T {
        return new construct(new BaseControl.GetSubControlLocation('tagFilterMenu', this.controlLocation, this.webDriver), this.webDriver);
    }
    showFolderMenuState<T>() {
        return this.getState<T>('showFolderMenu');
    }
    folderMenu<T>(construct: { new (controlLocation: BaseControl.IControlLocation, webDriver: webdriver.WebDriver): T; }): T {
        return new construct(new BaseControl.GetSubControlLocation('folderMenu', this.controlLocation, this.webDriver), this.webDriver);
    }
    showSortMenuState<T>() {
        return this.getState<T>('showSortMenu');
    }
    sortMenu<T>(construct: { new (controlLocation: BaseControl.IControlLocation, webDriver: webdriver.WebDriver): T; }): T {
        return new construct(new BaseControl.GetSubControlLocation('sortMenu', this.controlLocation, this.webDriver), this.webDriver);
    }
    listSelectedState<T>() {
        return this.getState<T>('listSelected');
    }
    showViewLinksState<T>() {
        return this.getState<T>('showViewLinks');
    }
    listLinkTooltipState<T>() {
        return this.getState<T>('listLinkTooltip');
    }
    listLinkElement() {
        return this.getElementFromControlId('listLink');
    }
    listLink_click() {
        return this.executeUserAction('listLink', 'click');
    }
    listIcon<T>(construct: { new (controlLocation: BaseControl.IControlLocation, webDriver: webdriver.WebDriver): T; }): T {
        return new construct(new BaseControl.GetSubControlLocation('listIcon', this.controlLocation, this.webDriver), this.webDriver);
    }
    gridSelectedState<T>() {
        return this.getState<T>('gridSelected');
    }
    gridLinkTooltipState<T>() {
        return this.getState<T>('gridLinkTooltip');
    }
    gridLinkElement() {
        return this.getElementFromControlId('gridLink');
    }
    gridLink_click() {
        return this.executeUserAction('gridLink', 'click');
    }
    gridIcon<T>(construct: { new (controlLocation: BaseControl.IControlLocation, webDriver: webdriver.WebDriver): T; }): T {
        return new construct(new BaseControl.GetSubControlLocation('gridIcon', this.controlLocation, this.webDriver), this.webDriver);
    }
    customSelectedState<T>() {
        return this.getState<T>('customSelected');
    }
    showCustomLayoutLinkState<T>() {
        return this.getState<T>('showCustomLayoutLink');
    }
    customLinkTooltipState<T>() {
        return this.getState<T>('customLinkTooltip');
    }
    customLinkElement() {
        return this.getElementFromControlId('customLink');
    }
    customLink_click() {
        return this.executeUserAction('customLink', 'click');
    }
    customIcon<T>(construct: { new (controlLocation: BaseControl.IControlLocation, webDriver: webdriver.WebDriver): T; }): T {
        return new construct(new BaseControl.GetSubControlLocation('customIcon', this.controlLocation, this.webDriver), this.webDriver);
    }
    isInfoPaneExpandedState<T>() {
        return this.getState<T>('isInfoPaneExpanded');
    }
    infoPaneLinkTooltipState<T>() {
        return this.getState<T>('infoPaneLinkTooltip');
    }
    infoPaneLinkElement() {
        return this.getElementFromControlId('infoPaneLink');
    }
    infoPaneLink_click() {
        return this.executeUserAction('infoPaneLink', 'click');
    }
    infoPaneIcon<T>(construct: { new (controlLocation: BaseControl.IControlLocation, webDriver: webdriver.WebDriver): T; }): T {
        return new construct(new BaseControl.GetSubControlLocation('infoPaneIcon', this.controlLocation, this.webDriver), this.webDriver);
    }
    responsiveListLinkElement() {
        return this.getElementFromControlId('responsiveListLink');
    }
    responsiveListLink_click() {
        return this.executeUserAction('responsiveListLink', 'click');
    }
    responsiveListIcon<T>(construct: { new (controlLocation: BaseControl.IControlLocation, webDriver: webdriver.WebDriver): T; }): T {
        return new construct(new BaseControl.GetSubControlLocation('responsiveListIcon', this.controlLocation, this.webDriver), this.webDriver);
    }
    responsiveGridLinkElement() {
        return this.getElementFromControlId('responsiveGridLink');
    }
    responsiveGridLink_click() {
        return this.executeUserAction('responsiveGridLink', 'click');
    }
    responsiveGridIcon<T>(construct: { new (controlLocation: BaseControl.IControlLocation, webDriver: webdriver.WebDriver): T; }): T {
        return new construct(new BaseControl.GetSubControlLocation('responsiveGridIcon', this.controlLocation, this.webDriver), this.webDriver);
    }
    navigationDropdown<T>(construct: { new (controlLocation: BaseControl.IControlLocation, webDriver: webdriver.WebDriver): T; }): T {
        return new construct(new BaseControl.GetSubControlLocation('navigationDropdown', this.controlLocation, this.webDriver), this.webDriver);
    }
    upIcon<T>(construct: { new (controlLocation: BaseControl.IControlLocation, webDriver: webdriver.WebDriver): T; }): T {
        return new construct(new BaseControl.GetSubControlLocation('upIcon', this.controlLocation, this.webDriver), this.webDriver);
    }
    nameState<T>() {
        return this.getState<T>('name');
    }
    layoutDirectionState<T>() {
        return this.getState<T>('layoutDirection');
    }
    breadcrumbBar<T>(construct: { new (controlLocation: BaseControl.IControlLocation, webDriver: webdriver.WebDriver): T; }): T {
        return new construct(new BaseControl.GetSubControlLocation('breadcrumbBar', this.controlLocation, this.webDriver), this.webDriver);
    }
    subTitleState<T>() {
        return this.getState<T>('subTitle');
    }
    setSubTitleElement() {
        return this.getElementFromControlId('setSubTitle');
    }
    setSubTitle_click() {
        return this.executeUserAction('setSubTitle', 'click');
    }
    contentContainerElement() {
        return this.getElementFromControlId('contentContainer');
    }
    contentContainer_click() {
        return this.executeUserAction('contentContainer', 'click');
    }
    isUpsellVisibleState<T>() {
        return this.getState<T>('isUpsellVisible');
    }
    isUpsellOneUnitState<T>() {
        return this.getState<T>('isUpsellOneUnit');
    }
    contentControlElement() {
        return this.getElementFromControlId('contentControl');
    }
    contentControl_contextmenu() {
        return this.executeUserAction('contentControl', 'contextmenu');
    }
    upsell<T>(construct: { new (controlLocation: BaseControl.IControlLocation, webDriver: webdriver.WebDriver): T; }): T {
        return new construct(new BaseControl.GetSubControlLocation('upsell', this.controlLocation, this.webDriver), this.webDriver);
    }
    contentControl<T>(construct: { new (controlLocation: BaseControl.IControlLocation, webDriver: webdriver.WebDriver): T; }): T {
        return new construct(new BaseControl.GetSubControlLocation('contentControl', this.controlLocation, this.webDriver), this.webDriver);
    }
    showFooterState<T>() {
        return this.getState<T>('showFooter');
    }
    footerContainerElement() {
        return this.getElementFromControlId('footerContainer');
    }
    infoPane<T>(construct: { new (controlLocation: BaseControl.IControlLocation, webDriver: webdriver.WebDriver): T; }): T {
        return new construct(new BaseControl.GetSubControlLocation('infoPane', this.controlLocation, this.webDriver), this.webDriver);
    }
    semanticZoom<T>(construct: { new (controlLocation: BaseControl.IControlLocation, webDriver: webdriver.WebDriver): T; }): T {
        return new construct(new BaseControl.GetSubControlLocation('semanticZoom', this.controlLocation, this.webDriver), this.webDriver);
    }
}
