sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("POReportForSCM1.controller.V_Input", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ZAP_VIM_Report1.view.V_Input
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ZAP_VIM_Report1.view.V_Input
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ZAP_VIM_Report1.view.V_Input
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ZAP_VIM_Report1.view.V_Input
		 */
		//	onExit: function() {
		//
		//	}
		
		GetPRequisitionCount: function(oEvt) {

			var oView = this.getView();
			var lv_DT = oView.byId("FromDate").getValue();
			var lv_BP = oView.byId("BP").getValue();
			var lv_PT = oView.byId("PT").getValue();

			if (lv_DT === '') {
				MessageToast.show('From Date is Mandatory. Please enter the Date.');
			}
			// defaulting dummy values as the parameters are mandatory in pattern
			// these are cleared and handled in the OData
			if (lv_BP === '') {
				lv_BP = '$$$';
			}
			// defaulting dummy values as the parameters are mandatory in pattern
			// these are cleared and handled in the OData			
			if (lv_PT === '') {
				lv_PT = '!!!!';
			}

			// Now Get the Router Info
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			// Tell the Router to Navigate To Route_Tar_1
			oRouter.navTo("Target_V_Count", {
				p_DT: lv_DT,
				p_BP: lv_BP,
				p_PT: lv_PT

			});
			//	oRouter.navTo("Route_PReqH", {});

		},

	});

});