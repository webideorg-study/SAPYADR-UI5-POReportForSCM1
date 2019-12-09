sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"], function(Controller,History) {
	"use strict";
	return Controller.extend("ZPReq.controller.V_PReqD", {
		onInit: function() {
			debugger;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Route_PReqD").attachMatched(this._onRouteFound, this);
		},
		_onRouteFound: function(oEvt) {
			debugger;
			var oArgument = oEvt.getParameter("arguments");
			var lv_banfn = oArgument.p_banfn;
			var lv_bnfpo = oArgument.p_bnfpo;
			// var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZGW_PREQ_SRV/");
			// this.getView().setModel(oModel);
			var filters = new sap.ui.model.Filter({
				and: true,
				filters: [
					new sap.ui.model.Filter("Banfn", sap.ui.model.FilterOperator.EQ, lv_banfn),
					new sap.ui.model.Filter("Bnfpo", sap.ui.model.FilterOperator.EQ, lv_bnfpo)
				]
			});
			var binding = this.byId("it_list").getBinding("items");
			binding.filter(filters);
		},

		GoToPReqH: function(evt) {
			debugger;
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
// If something goes wrong, go to Initial screen				
				oRouter.navTo("Route_Input", true);
			}			

		}	
	});
});