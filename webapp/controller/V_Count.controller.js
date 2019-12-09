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
			var datefilter = "?$filter=CreatedAt gt datetime'" + lv_DT + "T00:00:00'";
			var businessPartnerfilter = "and CustomerID eq '" + lv_BP + "'";
			var productfilter = "and ProductID eq '" + lv_PT + "'";

			//var oModelM = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZGW_PREQ_SRV/");
			//var Entity = "MethodtextSet?$filter=(InspLot eq '890000000451' and Inspoper eq '0010' and Inspchar eq '0010' and Material eq 'NUGGET')";
			//var Entity =  "PReqSet?$inlinecount=allpages";
			var Entity = "SalesOrderSet" + datefilter + businessPartnerfilter; //+ productfilter;
			var textData = [];
			oModelM.read(Entity, null, null, false, function(oData, response) {
				textData = oData.results;
			});
			var v_count = textData.length + " Purchase Requisitions Line Items which are not complete.";

			this.getView().byId("Count").setText(v_count);

			var oJson = {};
			oJson.vDT = lv_DT;
			oJson.vBP = lv_BP;
			oJson.vPT = lv_PT;

			this.myLocalModel.setData(oJson);
			// If we want this Model is another View/Page, we need to setModel		
			//		sap.ui.getCore().setModel(this.myLocalModel);

		},

	});

});