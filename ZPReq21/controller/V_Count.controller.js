sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
	"use strict";
	return Controller.extend("ZPReq.controller.V_Count", {
		onInit: function() {
			
// Instantiating a local model to be used in this controller			
			this.myLocalModel = new sap.ui.model.json.JSONModel();
			debugger;
			// Get the Router Info
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// Validate/Match the Router Details sent from Input Controller
			oRouter.getRoute("Route_Count").attachMatched(this._onRouteFound, this);
		},
		// Custom Method to bind the elements using the Event Arguments
		_onRouteFound: function(oEvt) {

			debugger;
			var oArgument = oEvt.getParameter("arguments");
			var lv_date = oArgument.p_date;
			var lv_pgroup = oArgument.p_grp;
			var lv_plant = oArgument.p_plant;
			var datefilter = "?$filter=Erdat gt datetime'" + lv_date + "T00:00:00'";
			var pgroupfilter = "and Ekgrp eq '" + lv_pgroup + "'";
			var plantfilter = "and Werks eq '" + lv_plant + "'";

			var oModelM = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZGW_PREQ_SRV/");
			//	var Entity = "MethodtextSet?$filter=(InspLot eq '890000000451' and Inspoper eq '0010' and Inspchar eq '0010' and Material eq 'NUGGET')";
			//var Entity =  "PReqSet?$inlinecount=allpages";
			var Entity = "PReqSet" + datefilter + pgroupfilter + plantfilter;
			var textData = [];
			oModelM.read(Entity, null, null, false, function(oData, response) {
				textData = oData.results;
			});
			var v_count = textData.length + " Purchase Requisitions Line Items which are not complete.";

			this.getView().byId("Count").setText(v_count);
			
				var oJson = {};
		oJson.vdate = lv_date;
		oJson.vpgroup = lv_pgroup;
		oJson.vplant = lv_plant;
		
		this.myLocalModel.setData(oJson);
// If we want this Model is another View/Page, we need to setModel		
//		sap.ui.getCore().setModel(this.myLocalModel);
		
		},

		ShowPReq: function(oEvt) {
			debugger;
			
			var lv_date = this.myLocalModel.oData.vdate;
			var lv_pgroup = this.myLocalModel.oData.vpgroup;
			var lv_plant = this.myLocalModel.oData.vplant;
			
			// Now Get the Router Info
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			
			// lv_pgroup = "ABC";
			// lv_plant = "5401";

			oRouter.navTo("Route_PReqH", {
				pDate: lv_date,
				pPgrp: lv_pgroup,
				pPlant: lv_plant
				
			});
		},
		/**
		 *@memberOf ZPReq.controller.V_Count
		 */
		GoToInputView: function(oEvt) {
			debugger;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Route_Input", {});
		}

		//* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		//* (NOT before the first rendering! onInit() is used for that one!).
		//* @memberOf POReportSCM.view.V_POHead
		//*/ //	onBeforeRendering: function() {
		//
		//	},
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf POReportSCM.view.V_POHead
		 */ //	onAfterRendering: function() {
		//
		//	},		
		// onAfterRendering: function() {
		// 	debugger;
		// 	alert('after rendering');

		// 	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		// 	// Validate/Match the Router Details sent from Input Controller
		// 	oRouter.getRoute("Route_Count").attachMatched(this._onRouteFound, this);
		// },

	});
});