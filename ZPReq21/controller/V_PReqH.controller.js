sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller,History) {
	"use strict";

	return Controller.extend("ZPReq.controller.V_PReqH", {

		onInit: function() {
			debugger;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Route_PReqH").attachMatched(this._onRouteFound, this);
		},

		_onRouteFound: function(oEvt) {
			var oArgument = oEvt.getParameter("arguments");

			var lv_date = oArgument.pDate;
			var lv_pgroup = oArgument.pPgrp;
			var lv_plant = oArgument.pPlant;
			debugger;

		//	var lv_date1 = "20170430";
			//var c = new Date('2012/12/05');
			//	var lv_date = new Date('2017/01/23');
			// 		var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "YYYY/MM/DD" });   
			// var lv_date = dateFormat.format(lv_date1);


			// var lv_date = new Date('2017/01/23');

			var filters = new sap.ui.model.Filter({
				and: true,
				filters: [new sap.ui.model.Filter("Erdat", sap.ui.model.FilterOperator.EQ, lv_date),
				new sap.ui.model.Filter("Ekgrp", sap.ui.model.FilterOperator.EQ, lv_pgroup),
				new sap.ui.model.Filter("Werks", sap.ui.model.FilterOperator.EQ, lv_plant)
				]
			});

			var binding = this.byId("it_list").getBinding("items");
			binding.filter(filters);

		},
		
		// Go Back to Output View
		NavToCountView: function(evt) {
			debugger;
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			
			if (sPreviousHash !== undefined) {
				window.history.go(-2);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Route_Input", true);
			}			

		},
		// Go Forward to Detail View
		NavToDetailView: function(oEvt) {
			debugger;

			var selBanfn = oEvt.getSource().getBindingContext().getProperty("Banfn");
			var selBnfpo = oEvt.getSource().getBindingContext().getProperty("Bnfpo");

			var oRouter1 = sap.ui.core.UIComponent.getRouterFor(this);

			oRouter1.navTo("Route_PReqD", {
				p_banfn: selBanfn,
				p_bnfpo: selBnfpo
				
			});

		}		

	});

});