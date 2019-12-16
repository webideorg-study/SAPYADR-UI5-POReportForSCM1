sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
	"use strict";
	return Controller.extend("POReportForSCM1.controller.V_PReqD", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ZAP_VIM_Report1.view.V_PReqD
		 */
		onInit: function() {
			// Get the Router Info
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// Validate/Match the Router Details sent from source using oRouter.navTo("Router_Detail", {SelectedItem: selectPO});
			oRouter.getRoute("Target_V_PReqD").attachMatched(this._onRouteFound, this);
		},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ZAP_VIM_Report1.view.V_PReqD
		 */ //	onBeforeRendering: function() {
		//
		//	},
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ZAP_VIM_Report1.view.V_PReqD
		 */ //	onAfterRendering: function() {
		//
		//	},
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ZAP_VIM_Report1.view.V_PReqD
		 */ //	onExit: function() {
		//
		//	}

		_onRouteFound: function(oEvent) {
			var oArgument = oEvent.getParameter("arguments");
			var lv_SO = oArgument.p_SO;
			var lv_CU = oArgument.p_CU;

			var ofilters = new sap.ui.model.Filter({
				and: true,
				filters: [
					new sap.ui.model.Filter({
						path: "SalesOrderID",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: lv_SO
					}),
					new sap.ui.model.Filter({
						path: "CustomerID",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: lv_CU
					})
				]
			});

			// 方式 1.1
			//var oBinding = this.getView().byId("it_list").getBinding("items");

			// 方式 1.2 -- 不适合这，这里不是本身的事件触发 
			//var oBinding = oEvent.getSource().getBinding("items");

			//oBinding.filter(ofilters);

			// 方式2
			var oArgument = oEvent.getParameter("arguments");
			var oView = this.getView();
			
			console.log(decodeURIComponent(oArgument.p_SO));

			//getParameters(arguments) -- key-value pair
			var sPath = decodeURIComponent(oArgument.p_SO);
			oView.bindElement({
				path: sPath
			});
		},

		/**
		 *@memberOf POReportForSCM1.controller.V_PReqD
		 */
		GoToPReqH: function(oEvent) {
			var oHistory = sap.ui.core.routing.History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			// Go one screen back if you find a Hash
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} // If you do not find a correct Hash, go to the Source screen using default router;
			else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Target_V_Input", true);
			}
		}
	});
});