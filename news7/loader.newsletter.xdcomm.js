/*! updated; 05-08-2019 05:10 PM **/


window.FNC.Loader.load(function(require){require(["jquery","core.plugins:EventMessageHandler"],function($,EventMessageHandler){var Handler=new EventMessageHandler;Handler.addHandler("newsletter.messenger.submit",function(data){$.ajax({type:"POST",url:"/portal/newsalertsubscribe",data:{slids:data.slid,email:data.email,format:"html"},dataType:"text"}).done(function(){}),Handler.sendMessage("parent","parent.newsletter.receiver",{uid:data.uid})}),Handler.sendMessage("parent","parent.newsletter.iframe.loaded",!0)})});