// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            portions copyright @2009 Apple, Inc.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

/*global module test htmlbody ok equals same */

htmlbody('<style> .sc-static-layout { border: 1px red dotted; } </style>');

  var iconURL= "http://www.freeiconsweb.com/Icons/16x16_people_icons/People_046.gif";
(function() {
var pane = SC.ControlTestPane.design()
  .add("basic", SC.ButtonView, { 
  })
  
  .add("title", SC.ButtonView, { 
     title: "Hello World" 
  })
   
  .add("icon", SC.ButtonView, { 
    icon: iconURL 
  })
    
  .add("title,icon", SC.ButtonView, { 
    title: "Hello World", icon: iconURL  
  })
     
  .add("title,icon,disabled", SC.ButtonView, { 
    title: "Hello World", icon: iconURL , isEnabled: NO 
  })
  
  .add("title,icon,default", SC.ButtonView, { 
    title: "Hello World", icon: iconURL , isDefault: YES 
  })

  .add("title,icon,selected", SC.ButtonView, { 
    title: "Hello World", icon: iconURL , isSelected: YES 
  })

  .add("title,toolTip", SC.ButtonView, { 
    title: "Hello World", toolTip: 'Hello World is my tool tip' 
  });

pane.show(); // add a test to show the test pane


module('SC.ButtonView ui');

test("Check that all button are visible", function() {
  ok(pane.view('basic').get('isVisibleInWindow'), 'basic.isVisibleInWindow should be YES');
  ok(pane.view('title').get('isVisibleInWindow'), 'title.isVisibleInWindow should be YES');
  ok(pane.view('icon').get('isVisibleInWindow'), 'icon.isVisibleInWindow should be YES');
  ok(pane.view('title,icon').get('isVisibleInWindow'), 'title,icon.isVisibleInWindow should be YES');
  ok(pane.view('title,icon,disabled').get('isVisibleInWindow'), 'title,icon,disabled.isVisibleInWindow should be YES');
  ok(pane.view('title,icon,default').get('isVisibleInWindow'), 'title,icon,default.isVisibleInWindow should be YES');
  ok(pane.view('title,icon,selected').get('isVisibleInWindow'), 'title.icon,selected.isVisibleInWindow should be YES');
  ok(pane.view('title,toolTip').get('isVisibleInWindow'), 'title,toolTip.isVisibleInWindow should be YES');
});
  

test("Check that all buttons have the right classes set", function() {
  var viewElem=pane.view('basic').$();
  ok(viewElem.hasClass('sc-view'), 'basic.hasClass(sc-view) should be YES');
  ok(viewElem.hasClass('sc-button-view'), 'basic.hasClass(sc-button-view) should be YES');
  ok(viewElem.hasClass('sc-regular-size'), 'basic.hasClass(sc-regular-size) should be YES');
  ok(!viewElem.hasClass('icon'), 'basic.hasClass(icon) should be NO');
  ok(!viewElem.hasClass('sel'), 'basic.hasClass(sel) should be NO');
  ok(!viewElem.hasClass('disabled'), 'basic.hasClass(disabled) should be NO');
  ok(!viewElem.hasClass('def'), 'basic.hasClass(def) should be NO');
  
  
  viewElem=pane.view('title').$();
  ok(viewElem.hasClass('sc-view'), 'title.hasClass(sc-view) should be YES');
  ok(viewElem.hasClass('sc-button-view'), 'title.hasClass(sc-button-view) should be YES');
  ok(viewElem.hasClass('sc-regular-size'), 'title.hasClass(sc-regular-size) should be YES');
  ok(!viewElem.hasClass('icon'), 'title.hasClass(icon) should be NO');
  ok(!viewElem.hasClass('sel'), 'title.hasClass(sel) should be NO');
  ok(!viewElem.hasClass('disabled'), 'title.hasClass(disabled) should be NO');
  ok(!viewElem.hasClass('def'), 'title.hasClass(def) should be NO');

  viewElem=pane.view('icon').$();
  ok(viewElem.hasClass('sc-view'), 'icon.hasClass(sc-view) should be YES');
  ok(viewElem.hasClass('sc-button-view'), 'icon.hasClass(sc-button-view) should be YES');
  ok(viewElem.hasClass('sc-regular-size'), 'icon.hasClass(sc-regular-size) should be YES');
  ok(viewElem.hasClass('icon'), 'icon.hasClass(icon) should be YES');
  ok(!viewElem.hasClass('sel'), 'icon.hasClass(sel) should be NO');
  ok(!viewElem.hasClass('disabled'), 'icon.hasClass(disabled) should be NO');
  ok(!viewElem.hasClass('def'), 'icon.hasClass(def) should be NO');

  viewElem=pane.view('title,icon').$();
  ok(viewElem.hasClass('sc-view'), 'title,icon.hasClass(sc-view) should be YES');
  ok(viewElem.hasClass('sc-button-view'), 'title,icon.hasClass(sc-button-view) should be YES');
  ok(viewElem.hasClass('sc-regular-size'), 'title,icon.hasClass(sc-regular-size) should be YES');
  ok(viewElem.hasClass('icon'), 'title,icon.hasClass(icon) should be YES');
  ok(!viewElem.hasClass('sel'), 'title,icon.hasClass(sel) should be NO');
  ok(!viewElem.hasClass('disabled'), 'title,icon.hasClass(disabled) should be NO');
  ok(!viewElem.hasClass('def'), 'title,icon.hasClass(def) should be NO');

  viewElem=pane.view('title,icon,disabled').$();
  ok(viewElem.hasClass('sc-view'), 'title,icon,disabled.hasClass(sc-view) should be YES');
  ok(viewElem.hasClass('sc-button-view'), 'title,icon,disabled.hasClass(sc-button-view) should be YES');
  ok(viewElem.hasClass('sc-regular-size'), 'title,icon,disabled.hasClass(sc-regular-size) should be YES');
  ok(viewElem.hasClass('icon'), 'title,icon,disabled.hasClass(icon) should be YES');
  ok(!viewElem.hasClass('sel'), 'title,icon,disabled.hasClass(sel) should be NO');
  ok(viewElem.hasClass('disabled'), 'title,icon,disabled.hasClass(disabled) should be YES');
  ok(!viewElem.hasClass('def'), 'title,icon,disabled.hasClass(def) should be NO');

  viewElem=pane.view('title,icon,default').$();
  ok(viewElem.hasClass('sc-view'), 'title,icon,default.hasClass(sc-view) should be YES');
  ok(viewElem.hasClass('sc-button-view'), 'title,icon,default.hasClass(sc-button-view) should be YES');
  ok(viewElem.hasClass('sc-regular-size'), 'title,icon,default.hasClass(sc-regular-size) should be YES');
  ok(viewElem.hasClass('icon'), 'title,icon,default.hasClass(icon) should be YES');
  ok(!viewElem.hasClass('sel'), 'title,icon,default.hasClass(sel) should be NO');
  ok(!viewElem.hasClass('disabled'), 'title,icon,default.hasClass(disabled) should be NO');
  ok(viewElem.hasClass('def'), 'title,icon,default.hasClass(def) should be YES');
  
  viewElem=pane.view('title,icon,selected').$();
   ok(viewElem.hasClass('sc-view'), 'title,icon,selected.hasClass(sc-view) should be YES');
   ok(viewElem.hasClass('sc-button-view'), 'title,icon,selected.hasClass(sc-button-view) should be YES');
   ok(viewElem.hasClass('sc-regular-size'), 'title,icon,selected.hasClass(sc-regular-size) should be YES');
   ok(viewElem.hasClass('icon'), 'title,icon,selected.hasClass(icon) should be YES');
   ok(viewElem.hasClass('sel'), 'title,icon,selected.hasClass(sel) should be YES');
   ok(!viewElem.hasClass('disabled'), 'title,icon,selected.hasClass(disabled) should be NO');
   ok(!viewElem.hasClass('def'), 'title,icon,selected.hasClass(def) should be NO');
   
   viewElem=pane.view('title,toolTip').$();
   ok(viewElem.hasClass('sc-view'), 'title,toolTip.hasClass(sc-view) should be YES');
   ok(viewElem.hasClass('sc-button-view'), 'title,toolTip.hasClass(sc-button-view) should be YES');
   ok(viewElem.hasClass('sc-regular-size'), 'title,toolTip.hasClass(sc-regular-size) should be YES');
   ok(!viewElem.hasClass('icon'), 'title,toolTip.hasClass(icon) should be NO');
   ok(!viewElem.hasClass('sel'), 'title,toolTip.hasClass(sel) should be NO');
   ok(!viewElem.hasClass('disabled'), 'title,toolTip.hasClass(disabled) should be NO');
   ok(!viewElem.hasClass('def'), 'title,toolTip.hasClass(def) should be NO');

});



test("Check that the title is set or not and if it is in the appropriate element", function() {
  var viewElem=pane.view('basic').$('span');
  equals(viewElem.text(), '', 'should not have a title');

  var viewElem=pane.view('title').$('span');
  equals(viewElem.text(), 'Hello World', 'should not have a title');


  var viewElem=pane.view('icon').$('span.label.img');
  ok((viewElem!=null), 'should have an image corresponding to an icon');

});

test("Check if title,toolTip has the tool tip set", function() {
  var viewElem=pane.view('title,toolTip').$('a');
  ok(viewElem.defaultClass[0].title == 'Hello World is my tool tip', 'title,toolTip has the expected tool tip set.');
});

})();
