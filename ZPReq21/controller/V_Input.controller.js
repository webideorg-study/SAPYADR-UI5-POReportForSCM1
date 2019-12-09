sap.ui.define(['jquery.sap.global',
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel',
	"sap/m/MessageToast"
], function(jQuery, Controller, JSONModel, MessageToast) {
	"use strict";
	return Controller.extend("ZPReq.controller.V_Input", {
		onInit: function() {

			debugger;
			
			// this.component = this.getComponent();
			// debugger;
			// this.model = this.component.getModel("");
			// this.setModel(this.model, "Model");

			// var vModel = this.getView().getModel();
			// var vModel = sap.ui.getCore().getModel();
			// vModel.setSizeLimit(500);

			// var oModel = new sap.ui.model.json.JSONModel();
			// oModel.setSizeLimit(500);
			// sap.ui.getCore().setModel(oModel);
		},

		GetPRequisitionCount: function(oEvt) {

			var oView = this.getView();
			var lv_date = oView.byId("FromDate").getValue();
			var lv_pgroup = oView.byId("PGrp").getValue();
			var lv_plant = oView.byId("Plant").getValue();

			if (lv_date === '') {
				MessageToast.show('From Date is Mandatory. Please enter the Date.');
			}
			// defaulting dummy values as the parameters are mandatory in pattern
			// these are cleared and handled in the OData
			if (lv_pgroup === '') {
				lv_pgroup = '$$$';
			}
			// defaulting dummy values as the parameters are mandatory in pattern
			// these are cleared and handled in the OData			
			if (lv_plant === '') {
				lv_plant = '!!!!';
			}

			// Now Get the Router Info
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			// Tell the Router to Navigate To Route_Tar_1
			oRouter.navTo("Route_Count", {
				p_date: lv_date,
				p_grp: lv_pgroup,
				p_plant: lv_plant

			});
			//	oRouter.navTo("Route_PReqH", {});

		},
		ShowPReq: function(oEvt) {

			// Now Get the Router Info
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			oRouter.navTo("Route_PReqH", {});

		}
		// handleLoadItems: function(oControlEvent) {
		// 	debugger;
		// 	oControlEvent.getSource().getBinding("items").resume();
		// 	debugger;
		// 	var oModel = sap.ui.getCore().getModel();
		// }
	});
});