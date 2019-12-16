sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
	"use strict";
	return Controller.extend("POReportForSCM1.controller.V_PReqH", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ZAP_VIM_Report1.view.V_PReqH
		 */
		onInit: function() {
			// Get the Router Info
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// Validate/Match the Router Details sent from source using oRouter.navTo("Router_Detail", {SelectedItem: selectPO});
			oRouter.getRoute("Target_V_PReqH").attachMatched(this._onRouteFound, this);
		},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ZAP_VIM_Report1.view.V_PReqH
		 */
		//	onBeforeRendering: function() {
		//
		//	},
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ZAP_VIM_Report1.view.V_PReqH
		 */
		//	onAfterRendering: function() {
		//
		//	},
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ZAP_VIM_Report1.view.V_PReqH
		 */
		//	onExit: function() {
		//
		//	}

		_onRouteFound: function(oEvent) {
			// var oArgument = oEvt.getParameter("arguments");
			// var lv_belnr = oArgument.p_belnr;
			// var lv_bukrs = oArgument.p_bukrs;
			// var lv_gjahr = oArgument.p_gjahr;
			// var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZGW_VIM_APP2_SRV/");
			// this.getView().setModel(oModel);
			// var filters = new sap.ui.model.Filter({
			// 	and: true,
			// 	filters: [new sap.ui.model.Filter("Belnr", sap.ui.model.FilterOperator.EQ, lv_belnr),
			// 		new sap.ui.model.Filter("Bukrs", sap.ui.model.FilterOperator.EQ, lv_bukrs),
			// 		new sap.ui.model.Filter("Gjahr", sap.ui.model.FilterOperator.EQ, lv_gjahr)
			// 	]
			// });
			// var binding = this.byId("list").getBinding("items");
			// binding.filter(filters);

			var oArgument = oEvent.getParameter("arguments");
			var lv_DT = oArgument.p_DT;
			var lv_BP = oArgument.p_BP;
			var lv_PT = oArgument.p_PT;

			var ofilters = new sap.ui.model.Filter({
				and: true,
				filters: [
					new sap.ui.model.Filter({
						path: "CreatedAt",
						operator: sap.ui.model.FilterOperator.GT,
						value1: lv_DT
					}),
					new sap.ui.model.Filter({
						path: "CustomerID",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: lv_BP
					})
				]
			});

			// 方式 1
			var oBinding = this.getView().byId("it_list").getBinding("items");

			// 方式 2 -- 不适合这，这里不是本身的事件触发 
			//var oBinding = oEvent.getSource().getBinding("items");

			oBinding.filter(ofilters);
		},

		/**
		 *@memberOf POReportForSCM1.controller.V_PReqH
		 */
		NavToCountView: function(oEvent) {
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
		},

		/**
		 *@memberOf POReportForSCM1.controller.V_PReqH
		 */
		NavToDetailView: function(oEvent) {
			var lv_SO = oEvent.getSource().getBindingContext().getProperty("SalesOrderID");
			var lv_CU = oEvent.getSource().getBindingContext().getProperty("CustomerID");

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			// 方式 1
			// oRouter.navTo("Target_V_PReqD", {
			// 	p_SO: lv_SO,
			// 	p_CU: lv_CU
			// });

			// 方式 2
			var sPath = oEvent.getSource().getBindingContext().getPath();

			console.log(sPath);
			console.log(encodeURIComponent(sPath));

			oRouter.navTo("Target_V_PReqD", {
				p_SO: encodeURIComponent(sPath),
				p_CU: "null"
			});
		}
	});
});