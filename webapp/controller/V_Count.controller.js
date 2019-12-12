sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("POReportForSCM1.controller.V_Count", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ZAP_VIM_Report1.view.V_Count
		 */
		onInit: function() {
			// Instantiating a local model to be used in this controller			
			this.myLocalModel = new sap.ui.model.json.JSONModel();
			//debugger;
			// Get the Router Info
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// Validate/Match the Router Details sent from Input Controller
			oRouter.getRoute("Target_V_Count").attachMatched(this._onRouteFound, this);

		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ZAP_VIM_Report1.view.V_Count
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ZAP_VIM_Report1.view.V_Count
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ZAP_VIM_Report1.view.V_Count
		 */
		//	onExit: function() {
		//
		//	}

		// Custom Method to bind the elements using the Event Arguments
		_onRouteFound: function(oEvt) {

			//debugger;
			var oArgument = oEvt.getParameter("arguments");
			var lv_DT = oArgument.p_DT;
			var lv_BP = oArgument.p_BP;
			var lv_PT = oArgument.p_PT;

			var datefilter = "?$filter=CreatedAt gt datetime'" + lv_DT + "T23:00:00.0000000'";
			var businessPartnerfilter = "and CustomerID eq '" + lv_BP + "'";
			//var productfilter = "and ProductID eq '" + lv_PT + "'";

			//var oModelM = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZGW_PREQ_SRV/");
			var oModelM = this.getOwnerComponent().getModel();
			//oModelM.setUseBatch(true);

			//var Entity = "/SalesOrderSet" + datefilter + businessPartnerfilter; //+ productfilter;
			var lv_DT = lv_DT + "T23:00:00.0000000Z";
			var oFilterGroup = new sap.ui.model.Filter({
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
			var aFilters = [oFilterGroup];

			// // 多条件筛选
			// var oFilter1 = new sap.ui.model.Filter(
			//     "CreatedAt",
			//     sap.ui.model.FilterOperator.GT,
			//     lv_DT
			// );

			// var oFilter2 = new sap.ui.model.Filter(
			//     "CustomerID",
			//     sap.ui.model.FilterOperator.EQ,
			//     lv_BP
			// );

			// // 实例化一个新的Filter, 参数2为false
			// var oFilterGroup = new sap.ui.model.Filter([oFilter1, oFilter2], true);
			// var aFilters = [oFilterGroup];

			var oView = this.getView();
			var textData = [];

			function fnSuccess_in(oData, oResponse) {
				sap.m.MessageToast.show("Successful");

				textData = oData.results;

				console.log(textData);
				console.log(textData.length);

				var v_count = textData.length + " Purchase Requisitions Line Items which are not complete.";
				//sap.ui.getCore().byId("__xmlview2--Count").setText(v_count);
				oView.byId("Count").setText(v_count);
			}

			function fnError_in(oError) {
				sap.m.MessageToast.show("Failure");
				console.log("Error", oError);
			}
			
			// // 方式1--先读取内容，然后计算内容长度
			// oModelM.read("/SalesOrderSet", {
			// 	"async": false, //在v2版本的ODataModel中async参数无效
			// 	// "urlParameters": {
			// 	// 	"$format": "xml"
			// 	// },
			// 	"filters": aFilters,
			// 	"success": fnSuccess_in,
			// 	"error": fnError_in
			// });
			
			// 方式2--直接读取OData长度
			oModelM.read("/SalesOrderSet/$count", {
				"async": false, //在v2版本的ODataModel中async参数无效
				// "urlParameters": {
				// 	"$format": "xml"
				// },
				"filters": aFilters,
				"success": function(oData, oResponse) {
					var v_count = oData + " Purchase Requisitions Line Items which are not complete.";
					//sap.ui.getCore().byId("__xmlview2--Count").setText(v_count);
					oView.byId("Count").setText(v_count);
				 },
				"error": fnError_in
			});

			var oJson = {};
			oJson.vDT = lv_DT;
			oJson.vBP = lv_BP;
			oJson.vPT = lv_PT;

			this.myLocalModel.setData(oJson);
			// If we want this Model is another View/Page, we need to setModel		
			//		sap.ui.getCore().setModel(this.myLocalModel);

		}

	});

});