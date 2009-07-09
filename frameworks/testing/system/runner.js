// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple, Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

/*globals CoreTest Q$ */

sc_require('jquery');
sc_require('system/plan');

/** @static
  The runner will automatically run the default CoreTest.plan when the 
  document is fully loaded.  It will also act as a delegate on the plan, 
  logging the output to the screen or console.

  @since SproutCore 1.0
*/


CoreTest.Runner = {
  
  /**
    The CoreTest plan.  If not set, a default plan will be created.
  */
  plan: null,
  errors: null,
  
  create: function() {
    var len = arguments.length,
        ret = CoreTest.beget(this),
        idx ;
        
    for(idx=0;idx<len;idx++) CoreTest.mixin(ret, arguments[len]);
    if (!ret.plan) ret.plan = CoreTest.Plan.create({ delegate: ret });
    Q$(window).load(function() { ret.begin(); });      
    return ret ;
  },
  
  begin: function() {
    var plan = CoreTest.plan;
    plan.delegate = this;
    plan.run();
  },
  
  planDidBegin: function(plan) {
    // setup the report DOM element.
    this.report = Q$(['<div class="core-test">',
      '<div class="useragent">UserAgent</div>',
      '<div class="testresult">',
        '<label class="hide-passed">',
          '<input type="checkbox" checked="checked" /> Hide passed tests',
        '</label>',
        '<span class="status">Running...</span>',
      '</div>',
      '<div class="detail">',
        '<table>',
          '<thead><tr>',
            '<th class="desc">Test</th><th>Result</th>',
          '</tr></thead>',
          '<tbody><tr></tr></tbody>',
        '</table>',
      '</div>',
    '</div>'].join(''));

      
    this.report.find('.useragent').html(navigator.userAgent);
    this.logq = this.report.find('tbody');
    this.testCount = 0 ;
    
    // listen to change event
    var runner = this;
    this.checkbox = this.report.find('.hide-passed input'); 
    this.checkbox.change(function() {
      runner.hidePassedTestsDidChange();
    });
    
    Q$('body').append(this.report);
  },
  
  hidePassedTestsDidChange: function() {
    var checked = !!this.checkbox.val();
        
    if (checked) {
      this.logq.addClass('hide-clean');
    } else {
      this.logq.removeClass('hide-clean');
    }
  },
  
  planDidFinish: function(plan, r) {
    this.flush();
    
    var result = this.report.find('.testresult .status');
    var str = CoreTest.fmt('<span>Completed %@ tests in %@ msec. </span>'
              +'<span class="total">%@</span> total assertions: ', r.tests, 
              r.runtime, r.total);
    
    if (r.passed > 0) {
      str += CoreTest.fmt('&nbsp;<span class="passed">%@ passed</span>', r.passed);
    }
    
    if (r.failed > 0) {
      str += CoreTest.fmt('&nbsp;<span class="failed">%@ failed</span>', r.failed);
    }

    if (r.errors > 0) {
      str += CoreTest.fmt('&nbsp;<span class="errors">%@ error%@</span>', 
            r.errors, (r.errors !== 1 ? 's' : ''));
    }

    if (r.warnings > 0) {
      str += CoreTest.fmt('&nbsp;<span class="warnings">%@ warnings%@</span>',
            r.warnings, (r.warnings !== 1 ? 's' : ''));
    }

    // if all tests passed, disable hiding them.  if some tests failed, hide
    // them by default.
    if (this.errors) this.errors.push('</tr></tbody></table>');
    if ((r.failed + r.errors + r.warnings) > 0) {
      this.hidePassedTestsDidChange(); // should be checked by default
    } else {
      this.report.find('.hide-passed').addClass('disabled')
        .find('input').attr('disabled', true);
      if (this.errors) this.errors.length = 0;
    }     
    if(CoreTest.showUI) Q$('.core-test').css("right", "360px");
    result.html(str);
    
    if (this.errors) CoreTest.errors=this.errors.join('');
  },
  
  planDidRecord: function(plan, module, test, assertions, timings) {
    var name = test, 
        s    = { passed: 0, failed: 0, errors: 0, warnings: 0 }, 
        len  = assertions.length, 
        clean = '', 
        idx, cur, q;
    
    for(idx=0;idx<len;idx++) s[assertions[idx].result]++;
    if ((s.failed + s.errors + s.warnings) === 0) clean = "clean" ;
    
    if (module) name = module + " module: " + test ;
    name = CoreTest.fmt('%@ - %@msec', name, timings.total_end - timings.total_begin);
    // place results into a single string to append all at once.
    var logstr = this.logstr ;
    var errors =this.errors;
    if (!logstr) logstr = this.logstr = [];
    if (!this.errors) {
      this.errors = ['<style type="text/css">* {font: 12px arial;}'+
                    '.passed { background-color: #80D175; color: white;}'+
                    '.failed { background-color: #ea4d4; color: black; }'+
                    '.errors { background-color: red; color: black; }'+
                    '.warnings { background-color: #E49723; color: black;}'+
                    '.desc { text-align: left;}'+
                    '</style><table style="border:1px solid"><thead>'+
                    '<tr><th class="desc">'+navigator.userAgent+
                    '</th><th>Result</th></tr>'+
                    '</thead><tbody><tr>'];
    }
    logstr.push(CoreTest.fmt('<tr class="test %@"><th class="desc" colspan="2">'+
          '%@ (<span class="passed">%@</span>, <span class="failed">%@</span>,'+
          ' <span class="errors">%@</span>, <span class="warnings">%@</span>)'+
          '</th></tr>', clean, name, s.passed, s.failed, s.errors, s.warnings));
    if(s.failed>0 || s.errors>0){
      this.errors.push(CoreTest.fmt('<tr class="test %@">'+
          '<th style="background:grey; color:white" class="desc" colspan="2">'+
          '%@ (<span class="passed">%@</span>, <span class="failed">%@</span>'+
          ', <span class="errors">%@</span>, <span class="warnings">%@</span>'+
          ')</th></tr>', clean, name, s.passed, s.failed, s.errors, s.warnings));  
    }
    
    len = assertions.length;
    for(idx=0;idx<len;idx++) {
      cur = assertions[idx];
      clean = cur.result === CoreTest.OK ? 'clean' : 'dirty';
      logstr.push(CoreTest.fmt('<tr class="%@"><td class="desc">%@</td>'
          +'<td class="action %@">%@</td></tr>', clean, cur.message, cur.result, 
          (cur.result || '').toUpperCase()));
      if(clean=='dirty'){
        this.errors.push(CoreTest.fmt('<tr class="%@"><td class="desc">%@</td>'
        +'<td class="action %@">%@</td></tr>', clean, cur.message, cur.result,
        (cur.result || '').toUpperCase()));
      }
    }
    
    this.testCount++;
    this.resultStr = CoreTest.fmt("Running – Completed %@ tests so far.", this.testCount);
  },
  
  // called when the plan takes a break.  Good time to flush HTML output.
  planDidPause: function(plan) {
    if(navigator.userAgent.indexOf('MSIE')==-1) this.flush();  
  },
  
  // flush any pending HTML changes...
  flush: function() {
    var logstr = this.logstr,
        resultStr = this.resultStr,
        result = this.report.find('.testresult .status');
        
    if (logstr) this.logq.append(this.logstr.join('')) ;
    
    if (resultStr) result.html(resultStr);
    this.resultStr = this.logstr = null ;
  }
  
};
