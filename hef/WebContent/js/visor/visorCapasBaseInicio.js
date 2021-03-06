var capasBaseArr	= new Array();
function iniciarCapasBase() {
	$.post('cargarCapasBaseJson.action', null, function(datos) {
		capasBaseArr	= datos.listCapasBase;
	}, "json");
	$("select[name=centrar_departamento]").change(centrar_depa_upd_dpto);
	$("select[name=centrar_prov_departamento]").change(centrar_prov_upd_dpto);
	$("select[name=centrar_dist_departamento]").change(centrar_dist_upd_dpto);
}
function buscarCapasBaseById(srlIdCapasBase) {
	for(var i = 0;i < capasBaseArr.length;i++) {
		if(capasBaseArr[i].srlIdCapasBase == srlIdCapasBase) {
			return capasBaseArr[i];
		}
	}
	return null;
}
function mostrarCapaById(srlIdCapasBase) {
	var capaBase	= buscarCapasBaseById(srlIdCapasBase);
	if(capaBase && !capaBase.currLayer) {
		var url		= capaBase.strWmsUrl;
		var layers	= "show: " + capaBase.strWmsCapas;
		capaBase.currLayer	= new ol.layer.Tile({
			source: new ol.source.TileArcGISRest({
				url: url,
				params: {
					LAYERS: layers
				}
			})
		});
		map.addLayer(capaBase.currLayer);
	}
}
function ocultarCapaById(srlIdCapasBase) {
	var capaBase	= buscarCapasBaseById(srlIdCapasBase);
	if(capaBase && capaBase.currLayer) {
		map.removeLayer(capaBase.currLayer);
		capaBase.currLayer	= null;
	}
}
function centrarMapa(srlIdCapasBase) {
	$('.centrar-mapa-modal').off('shown.bs.modal');
	$('.centrar-mapa-modal').off('hidden.bs.modal');
	$('.centrar-mapa-modal').on('shown.bs.modal', function (e) {
		if($("input[name=CAPAS_BASE_DEPARTAMENTO]").val() == srlIdCapasBase) {
			$("#idDivCentrarDepartamento").css("display","");
			$("#idDivCentrarProvincia").css("display","none");
			$("#idDivCentrarDistrito").css("display","none");
		} else if($("input[name=CAPAS_BASE_PROVINCIA]").val() == srlIdCapasBase) {
			$("#idDivCentrarDepartamento").css("display","none");
			$("#idDivCentrarProvincia").css("display","");
			$("#idDivCentrarDistrito").css("display","none");
		} else if($("input[name=CAPAS_BASE_DISTRITO]").val() == srlIdCapasBase) {
			$("#idDivCentrarDepartamento").css("display","none");
			$("#idDivCentrarProvincia").css("display","none");
			$("#idDivCentrarDistrito").css("display","");
		}
	});
	$('.centrar-mapa-modal').on('hidden.bs.modal', function (e) {
//		finalizarAllEventListenerIframe();
	});
	$('.centrar-mapa-modal').modal('show');
}
function descargarMapa(srlIdCapasBase) {
	var capaBase	= buscarCapasBaseById(srlIdCapasBase);
	if(capaBase) {
//		document.location.href=capaBase.strWfsUrl;
		var frm	= document.form;
		frm.action=capaBase.strWfsUrl;
		frm.target="_blank";
		frm.submit();
	}
}
function mostrarInfo(srlIdCapasBase) {
	$('.info-capas-modal').off('shown.bs.modal');
	$('.info-capas-modal').off('hidden.bs.modal');
	$('.info-capas-modal').on('shown.bs.modal', function (e) {
		var capaBase	= buscarCapasBaseById(srlIdCapasBase);
		if(capaBase) {
			$("#idDivInfoNombre").html(capaBase.strNombre);
			$("#idDivInfoComentario").html(capaBase.strComentarios);
			$("#idDivInfoUrl").html(capaBase.strUrl);
			$("#idDivInfoFecha").html(capaBase.timFechaRegistroFechaHora);
		}
	});
	$('.info-capas-modal').on('hidden.bs.modal', function (e) {
//		finalizarAllEventListenerIframe();
	});
	$('.info-capas-modal').modal('show');
}
//////////////////////////////////////////////////////////////////
function centrar_depa_upd_dpto() {
	var centrar_departamento	= $("select[name=centrar_departamento]").val();
	$.post('centrarDepartamentoJson.action', {"centrar_departamento":centrar_departamento}, function(datos) {
		centrarZoomMapaFromBox(datos.strCentroDepartamento);
	}, "json");
}
//////////////////////////////////////////////////////////////////
function centrar_prov_upd_dpto() {
	var centrar_prov_departamento	= $("select[name=centrar_prov_departamento]").val();
	$.post('centrarProvinciaEnDepartamentoJson.action', {"centrar_prov_departamento":centrar_prov_departamento}, function(datos) {
		centrarZoomMapaFromBox(datos.strCentroDepartamento);
	}, "json");
	cargarCombo_prov_en_provincia();
}
function centrar_prov_upd_prov() {
	//$("select[name=centrar_prov_departamento]").
	//$("select[name=centrar_prov_provincia]").
	var centrar_prov_provincia	= $("select[name=centrar_prov_provincia]").val();
	$.post('centrarProvinciaEnProvinciaJson.action', {"centrar_prov_provincia":centrar_prov_provincia}, function(datos) {
		centrarZoomMapaFromBox(datos.strCentroProvincia);
	}, "json");
}
//////////////////////////////////////////////////////////////////
function centrar_dist_upd_dpto() {
	var centrar_dist_departamento	= $("select[name=centrar_dist_departamento]").val();
	$.post('centrarDistritoEnDepartamentoJson.action', {"centrar_dist_departamento":centrar_dist_departamento}, function(datos) {
		centrarZoomMapaFromBox(datos.strCentroDepartamento);
	}, "json");
	cargarCombo_dist_en_provincia();
}
function centrar_dist_upd_prov() {
	var centrar_dist_provincia	= $("select[name=centrar_dist_provincia]").val();
	$.post('centrarDistritoEnProvinciaJson.action', {"centrar_dist_provincia":centrar_dist_provincia}, function(datos) {
		centrarZoomMapaFromBox(datos.strCentroProvincia);
	}, "json");
	cargarCombo_dist_en_distrito();
}
function centrar_dist_upd_dist() {
	//$("select[name=centrar_dist_departamento]").
	//$("select[name=centrar_dist_provincia]").
	//$("select[name=centrar_dist_distrito]").
	var centrar_dist_distrito	= $("select[name=centrar_dist_distrito]").val();
	$.post('centrarDistritoEnDistritoJson.action', {"centrar_dist_distrito":centrar_dist_distrito}, function(datos) {
		centrarZoomMapaFromBox(datos.strCentroDistrito);
	}, "json");
}
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

function centrarZoomMapaFromBox(txtBox) {
	var formatWkt		= new ol.format.WKT();
	var newVectorGeom	= formatWkt.readGeometry(txtBox);
	var geomTransform	= newVectorGeom.transform('EPSG:4326', 'EPSG:3857');

	map.getView().fit(geomTransform, map.getSize(),{});
}
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
function cargarCombo_prov_en_provincia() {
	var centrar_prov_departamento	= $("select[name=centrar_prov_departamento]").val();
	$.post('comboCentrarProvinciaEnProvincia.action', {"centrar_prov_departamento":centrar_prov_departamento}, function(datos) {
		$("#idDivComboProvinciaEnProvincia").html(datos);
	});
}

function cargarCombo_dist_en_provincia() {
	var centrar_dist_departamento	= $("select[name=centrar_dist_departamento]").val();
	$.post('comboCentrarDistritoEnProvincia.action', {"centrar_dist_departamento":centrar_dist_departamento}, function(datos) {
		$("#idDivComboDistritoEnProvincia").html(datos);
	});
}
function cargarCombo_dist_en_distrito() {
	var centrar_dist_provincia	= $("select[name=centrar_dist_provincia]").val();
	$.post('comboCentrarDistritoEnDistrito.action', {"centrar_dist_provincia":centrar_dist_provincia}, function(datos) {
		$("#idDivComboDistritoEnDistrito").html(datos);
	});
}
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
